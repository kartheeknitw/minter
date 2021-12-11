import React from "react";

function TokenInfo({state}) {
    const { tx, contract } = state
    return (
    <h1> Tx: {tx} Contract: {contract}!</h1>);
}

export default TokenInfo;