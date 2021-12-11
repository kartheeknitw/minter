import React from "react";
import { Button } from "antd";

function TokenInfo({state, addToken}) {
    const { tx, minted } = state
    const url = "https://explorer.pops.one/tx/" + tx;
    const displayTx = tx.slice(0,6) + "..." + tx.slice(-6);
    return (
        <div>
        <a href={url} target="_blank">Transaction: {displayTx}</a>
        <br></br>
        <p>Minted Token: {minted}</p>
        <Button onClick={addToken} type='primary'>Add to Wallet</Button>
       </div>
    );
}

export default TokenInfo;