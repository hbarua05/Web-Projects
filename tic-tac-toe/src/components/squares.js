import React from "react";

export default function Square({ value, color, onClick }) {
    return (
        <button
            style={{
                backgroundColor: color,
            }}
            className="square"
            onClick={onClick}
        >
            <p>{value}</p>
        </button>
    );
}
