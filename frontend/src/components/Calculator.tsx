import { useState } from "react";
import CalculatorButton from "./CalculatorButton";
import { calculateResult } from "../functions/CalculatorFunctions";
import type { DataCalculator } from "../interfaces/CalculatorInterfaces";
import { sendErrorNotification } from "../functions/CalculatorFunctions";

const Calculator = () => {
    const [currNumber, setCurrNumber] = useState("");
    const [prevNumber, setPrevNumber] = useState("");
    const [operator, setOperator] = useState("");

    function handleNumberClick(num:string){
        if (currNumber.length !== 16) {
            setCurrNumber(prev => prev + num)
        }
    }

    function handleSignChangeClick() {
        if (currNumber !== "") {
            const newCurrNumber = Number(currNumber) * -1;
            setCurrNumber(newCurrNumber.toString())
        }
    }

    function handleDecimalClick() {
        if(!currNumber.includes(".") && currNumber !== "") {
            setCurrNumber(prev => prev + ".")
        }

        if(currNumber === "") {
            setCurrNumber("0.")
        }
    }

    function handleClearClick() {
        setCurrNumber("")
        setPrevNumber("")
        setOperator("")
    }

    async function handleOperatorClick(op: string) {
        if (prevNumber == "" && currNumber !== "") {
            setPrevNumber(currNumber)
            setCurrNumber("")
            setOperator(op)

        } else if (prevNumber !== "" && currNumber == "") {
            setOperator(op)

        } else {
            const data:DataCalculator = {
                operand1: Number(prevNumber),
                operand2: Number(currNumber),
                operation: operator
            }
            const result = await calculateResult(data)
            if(result){
                setPrevNumber(result)
                setCurrNumber("")
                setOperator(op)
            } else{
                sendErrorNotification("Error calculating result.");
            }
        }
    }

    async function handleEqualClick(){
        if (prevNumber !== "" && currNumber !== "" && operator !== "") {
            const data:DataCalculator = {
                operand1: Number(prevNumber),
                operand2: Number(currNumber),
                operation: operator
            }

            const result = await calculateResult(data);

            if(result){
                setCurrNumber(result)
                setPrevNumber("")
                setOperator("")
            } else{
                sendErrorNotification("Error calculating result.");
            }
        }
    }

    function handleDisplay() {
        if (currNumber === "") {
            return "0"
        }

        const [integer, decimal] = currNumber.split(".")
        const formattedInteger = Number(integer).toLocaleString()

        if (!decimal && currNumber.endsWith(".")) {
            return `${formattedInteger}.`
        }

        return decimal ? `${formattedInteger}.${decimal}` : formattedInteger
    }

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg p-6">

            <div data-testid="display" className="bg-white p-4 mb-4 text-right text-2xl
            shadow-md rounded-lg"> {handleDisplay()} </div>
            <div className="grid grid-cols-4 gap-3">
            <CalculatorButton onClick={() => handleClearClick()} className="col-span-2 opacity-50">
                C
            </CalculatorButton>
            <CalculatorButton onClick={() => handleSignChangeClick()} className="opacity-50">
                +/-
            </CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick('add')} className="opacity-50">
                +
            </CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('7')}>
                7
            </CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('8')}>
                8
            </CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('9')}>
                9
            </CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick('divide')} className="opacity-50">
                /
            </CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('4')}>
                4
            </CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('5')}>
                5
            </CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('6')}>
                6
            </CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick('multiply')} className="opacity-50">
                *
            </CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('1')}>
                1
            </CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('2')}>
                2
            </CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('3')}>
                3
            </CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick('subtract')} className="opacity-50">
                -
            </CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('0')} className="col-span-2">
                0
            </CalculatorButton>
            <CalculatorButton onClick= {() => handleDecimalClick()} className="opacity-50">
                .
            </CalculatorButton>
            <CalculatorButton onClick= {() => handleEqualClick()} className="bg-blue-300">
                =
            </CalculatorButton>
            </div>
        </div>
    )
}

export default Calculator