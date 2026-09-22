import axios from "axios";
import type { DataCalculator, CalculatorResponse } from "../interfaces/CalculatorInterfaces";
import { toast } from "react-toastify";

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

        return null
    }
}

export function sendErrorNotification(msg:string){
    toast.error(
        msg, {position: 'bottom-left',}
    )
}