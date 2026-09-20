export interface CalculatorButtonProps {
    children: string;
    className?: string;
    onClick?: () => void;
}

export interface DataCalculator {
    operand1: number;
    operand2: number;
    operation: string;
}

export interface CalculatorResponse {
    result: number;
}