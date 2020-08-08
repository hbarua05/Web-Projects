import React from "react";

export default function ResetButton(props) {
    return (
        <button className="reset" onClick={props.onClick()}>
            Play New Game
        </button>
    );
}
