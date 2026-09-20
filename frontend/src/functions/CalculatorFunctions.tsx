import axios from "axios";
import type { DataCalculator, CalculatorResponse } from "../interfaces/CalculatorInterfaces";

export async function calculateResult({operand1, operand2, operation}:DataCalculator): Promise<string | null> {
    const data: DataCalculator = {
        operand1: operand1,
        operand2: operand2,
        operation: operation
    }

    try {
        const response = await axios.post("http://localhost:8000/calculate", data)

        const result:CalculatorResponse = response.data

        return result.result.toString()

    } catch (error){
        console.error("Error calculating result:", error)
        // Ideally I would also show this error as a user error in the screen using something like Toastify.
        // Which will let the user identify if it is a backend connection error or an handled error sent out like division by 0.
        return null
    }
}