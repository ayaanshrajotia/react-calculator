import React from "react";
import "./css/ActionButton.css";
import { ACTIONS } from "./Calculator";

const ActionButton = ({ operation, number, dispatch }) => {
    return (
        <div
            className="action-button"
            onClick={() =>
                dispatch({
                    type: ACTIONS.CHOOSE_OPERATION,
                    payload: { operation, number },
                })
            }
        >
            {number}
        </div>
    );
};

export default ActionButton;
