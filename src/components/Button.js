import React from "react";
import "./css/Button.css";
import { ACTIONS } from "./Calculator";

const Button = ({ number, value, dispatch }) => {
    return (
        <div
            className="button"
            onClick={() =>
                dispatch({ type: ACTIONS.ADD_DIGIT, payload: { value } })
            }
        >
            {number}
        </div>
    );
};

export default Button;
