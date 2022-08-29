import React, { useReducer, useState } from "react";
import Button from "./Button";
import "./css/Calculator.css";
import ActionButton from "./ActionButton";

export const ACTIONS = {
    ADD_DIGIT: "add-digit",
    CHOOSE_OPERATION: "choose-operation",
    CLEAR: "clear",
    DELETE_DIGIT: "delete-digit",
    EVALUATE: "evaluate",
    COLOR_MODE: "color-mode",
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.value,
                    previousOperand: null,
                    currPrevOperand: null,
                    icon: null,
                    overwrite: false,
                };
            }
            if (payload.value === "0" && state.currentOperand === "0")
                return state;

            if (payload.value === "." && state.currentOperand === "")
                return state;

            if (payload.value === "." && state.currentOperand.includes("."))
                return state;

            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.value}`,
            };

        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return { ...state, overwrite: false, currentOperand: null };
            }

            if (state.currentOperand == null) return state;

            if (state.currentOperand.length === 1) {
                return { ...state, currentOperand: null };
            }

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            };

        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null)
                return state;

            if (state.previousOperand == null) {
                return {
                    ...state,
                    operator: payload.operation,
                    icon: payload.number,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                };
            }

            if (state.operator != null) {
                return {
                    ...state,
                    operator: payload.operation,
                    icon: payload.number,
                };
            }

            return {
                ...state,
                previousOperand: evaluate(state),
                operator: payload.operation,
                icon: payload.number,
                currentOperand: null,
            };

        case ACTIONS.CLEAR:
            return {};

        case ACTIONS.EVALUATE:
            if (
                state.currentOperand == null ||
                state.previousOperand == null ||
                state.operator == null
            ) {
                return state;
            }
            return {
                state,
                currentOperand: evaluate(state),
                previousOperand: state.previousOperand,
                icon: state.icon,
                currPrevOperand: state.currentOperand,
                overwrite: true,
            };

        case ACTIONS.COLOR_MODE:

        // eslint-disable-next-line no-fallthrough
        default:
            return state;
    }
};

const evaluate = ({ currentOperand, previousOperand, operator }) => {
    const prev = parseFloat(currentOperand);
    const curr = parseFloat(previousOperand);

    if (isNaN(prev) || isNaN(curr)) return "";

    let computation = "";
    switch (operator) {
        case "+":
            computation = prev + curr;
            break;
        case "-":
            computation = curr - prev;
            break;
        case "*":
            computation = prev * curr;
            break;
        case "/":
            computation = prev / curr;
            break;
        default:
            computation = "";
            break;
    }

    return computation.toString();
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
});

function formatOperand(operand) {
    if (operand == null) return;
    const [integer, decimal] = operand.split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
}

const Calculator = () => {
    const [
        { currentOperand, previousOperand, icon, currPrevOperand },
        dispatch,
    ] = useReducer(reducer, {});

    const [mode, setMode] = useState("light-mode");

    return (
        <div className="calc" id={mode}>
            <div className="color-mode">
                <button
                    className="color-button sun"
                    style={
                        mode === "light-mode"
                            ? { color: "black" }
                            : { color: "rgb(113,115,121)" }
                    }
                    onClick={() => setMode("light-mode")}
                >
                    <i class="fa-regular fa-sun" />
                </button>
                <button
                    className="color-button moon"
                    style={
                        mode === "dark-mode"
                            ? { color: "white" }
                            : { color: "rgb(113,115,121)" }
                    }
                    onClick={() => setMode("dark-mode")}
                >
                    <i class="fa-regular fa-moon" />
                </button>
            </div>
            <div className="display">
                <div className="previous-display">
                    {formatOperand(previousOperand)} {icon}{" "}
                    {formatOperand(currPrevOperand)}
                </div>
                <div className="current-display">
                    {formatOperand(currentOperand)}
                </div>
            </div>
            <div className="remote">
                <button
                    className="button"
                    onClick={() => dispatch({ type: ACTIONS.CLEAR })}
                    style={{
                        textDecoration: "none",
                        color: "rgb(37, 237, 201)",
                    }}
                >
                    AC
                </button>
                <ActionButton
                    number={
                        <i
                            className="fa-solid fa-plus-minus"
                            style={{ color: "rgb(37,237,201)" }}
                        ></i>
                    }
                />
                <ActionButton
                    number={
                        <i
                            className="fa-solid fa-percent"
                            style={{ color: "rgb(37,237,201)" }}
                        ></i>
                    }
                    operation="%"
                    dispatch={dispatch}
                />
                <ActionButton
                    number={
                        <i
                            className="fa-solid fa-divide"
                            style={{ color: "rgb(243,122,120)" }}
                        ></i>
                    }
                    operation="/"
                    dispatch={dispatch}
                />
                <Button number={7} value="7" dispatch={dispatch} />
                <Button number={8} value="8" dispatch={dispatch} />
                <Button number={9} value="9" dispatch={dispatch} />
                <ActionButton
                    number={
                        <i
                            className="fa-solid fa-xmark"
                            style={{ color: "rgb(243,122,120)" }}
                        ></i>
                    }
                    operation="*"
                    dispatch={dispatch}
                />
                <Button number={4} value="4" dispatch={dispatch} />
                <Button number={5} value="5" dispatch={dispatch} />
                <Button number={6} value="6" dispatch={dispatch} />
                <ActionButton
                    number={
                        <i
                            className="fa-solid fa-minus"
                            style={{ color: "rgb(243,122,120)" }}
                        ></i>
                    }
                    operation="-"
                    dispatch={dispatch}
                />
                <Button number={1} value="1" dispatch={dispatch} />
                <Button number={2} value="2" dispatch={dispatch} />
                <Button number={3} value="3" dispatch={dispatch} />
                <ActionButton
                    number={
                        <i
                            className="fa-solid fa-plus"
                            style={{ color: "rgb(243,122,120)" }}
                        >
                            {" "}
                        </i>
                    }
                    operation="+"
                    dispatch={dispatch}
                />
                <button
                    className="button"
                    onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
                >
                    <i
                        className="fa-solid fa-arrow-rotate-right"
                        style={{ transform: "scaleX(-1) rotate(-10deg)" }}
                    ></i>
                </button>
                <Button number={0} value="0" dispatch={dispatch} />
                <Button number="." value="." dispatch={dispatch} />
                <button
                    className="button"
                    value={"="}
                    onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
                >
                    <i
                        className="fa-solid fa-equals"
                        style={{ color: "rgb(243,122,120)" }}
                    ></i>
                </button>
            </div>
        </div>
    );
};

export default Calculator;
