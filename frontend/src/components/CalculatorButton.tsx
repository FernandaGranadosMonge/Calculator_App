import { twMerge } from "tailwind-merge";
import type { CalculatorButtonProps } from "../interfaces/CalculatorInterfaces";

const CalculatorButton = ({ children, className, onClick }: CalculatorButtonProps) => {
    return (
        <button
            className={twMerge(`text-xl bg-white p-4 rounded-lg
            shadow-md hover:brightness-95 hover:cursor-pointer
            active:brightness-90`, className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default CalculatorButton