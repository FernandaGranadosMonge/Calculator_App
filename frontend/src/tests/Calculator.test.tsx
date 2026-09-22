import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import axios from "axios";
import { calculateResult } from "../functions/CalculatorFunctions";
import type { DataCalculator } from "../interfaces/CalculatorInterfaces";

import Calculator from "../components/Calculator";

// when axios is imported, it will use a mock axios instead
// we've already tested the backend functionality so there is no point in doing it again
vi.mock("axios");

describe("Calculate function", () => {
    it("returns the result from the backend", async () => {
        // define the axios.post behaviour present in calculateResult
        vi.mocked(axios.post).mockResolvedValue({
            data: {
                result: 100
            }
        });

        const data:DataCalculator = {
            operand1: 80,
            operand2: 20,
            operation: "add"
        };

        const result = await calculateResult(data);

        // calculateResult should return the result as a string
        expect(result).toBe("100");
    });

    it("sends the correct data to the backend", async () => {
        vi.mocked(axios.post).mockResolvedValue({
            data: {
                result: 15
            }
        });

        const data:DataCalculator = {
            operand1: 10,
            operand2: 5,
            operation: "add"
        };

        await calculateResult(data);

        expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:8000/calculate",
            data
        );
    });
});

describe("Calculator UI", () => {
    it("shows 0 when nothing has been pressed", async () => {
        render(<Calculator />);

        expect(screen.getByTestId("display")).toHaveTextContent("0")
    });

    it("shows pressed numbers", async () => {
        const user = userEvent.setup();

        render(<Calculator />);

        await user.click(screen.getByRole("button", { name: "8" }));
        await user.click(screen.getByRole("button", { name: "9" }));
        await user.click(screen.getByRole("button", { name: "0" }));

        expect(screen.getByTestId("display")).toHaveTextContent("890");
    });

    it("clears the screen when pressing C", async () => {
        const user = userEvent.setup();

        render(<Calculator />);

        await user.click(screen.getByRole("button", { name: "8" }));
        await user.click(screen.getByRole("button", { name: "9" }));
        await user.click(screen.getByRole("button", { name: "0" }));
        await user.click(screen.getByRole("button", { name: "C" }));

        expect(screen.getByTestId("display")).toHaveTextContent("0")
    });

    it("shows decimal input", async () => {
        const user = userEvent.setup();

        render(<Calculator />);

        await user.click(screen.getByRole("button", { name: "6" }));
        await user.click(screen.getByRole("button", { name: "." }));
        await user.click(screen.getByRole("button", { name: "2" }));

        expect(screen.getByTestId("display")).toHaveTextContent("6.2")
    });

    it("changes number sign", async () => {
        const user = userEvent.setup();

        render(<Calculator />);

        await user.click(screen.getByRole("button", { name: "2" }));
        await user.click(screen.getByRole("button", { name: "0" }));
        await user.click(screen.getByRole("button", { name: "+/-" }));

        expect(screen.getByTestId("display")).toHaveTextContent("-20")
    });

    it("should follow the calculation flow and display the backend result", async () => {
        vi.mocked(axios.post).mockResolvedValue({
            data: {
                result: 36
            }
        });

        const user = userEvent.setup();

        render(<Calculator />);

        // 12 * 3
        await user.click(screen.getByRole("button", { name: "1" }));
        await user.click(screen.getByRole("button", { name: "2" }));
        await user.click(screen.getByRole("button", { name: "*" }));
        await user.click(screen.getByRole("button", { name: "3" }));
        await user.click(screen.getByRole("button", { name: "=" }));

        const data:DataCalculator = {
            operand1: 12,
            operand2: 3,
            operation: "multiply"
        }

        expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:8000/calculate",
            data
        )


        expect(screen.getByTestId("display")).toHaveTextContent("36")
    });

    it("should allow multiple operations", async () => {
        // Backend will return 36 for first call
        vi.mocked(axios.post).mockResolvedValueOnce({
            data: {
                result: 36
            }
        });
        // Backend will return 38.5 for second call
        vi.mocked(axios.post).mockResolvedValueOnce({
            data: {
                result: 38.5
            }
        });

        const user = userEvent.setup();

        render(<Calculator />);

        // 12 * 3
        await user.click(screen.getByRole("button", { name: "1" }));
        await user.click(screen.getByRole("button", { name: "2" }));
        await user.click(screen.getByRole("button", { name: "*" }));
        await user.click(screen.getByRole("button", { name: "3" }));
        await user.click(screen.getByRole("button", { name: "+" }));

        const firstOperation:DataCalculator = {
            operand1: 12,
            operand2: 3,
            operation: "multiply"
        }

        expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:8000/calculate",
            firstOperation
        )

        // 36 + 2.5
        await user.click(screen.getByRole("button", { name: "2" }));
        await user.click(screen.getByRole("button", { name: "." }));
        await user.click(screen.getByRole("button", { name: "5" }));
        await user.click(screen.getByRole("button", { name: "=" }));

        const secondOperation:DataCalculator = {
            operand1: 36,
            operand2: 2.5,
            operation: "add"
        }

        expect(axios.post).toHaveBeenLastCalledWith(
            "http://localhost:8000/calculate",
            secondOperation
        )

        expect(screen.getByTestId("display")).toHaveTextContent("38.5")
    });

});