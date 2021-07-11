

const Symbols = ({symbols}) => {
    let data = []
    let keys = ["symbolId",
        "symbol",
        "multiplier",
        "feeRatio",
        "strikePrice",
        "isCall",
        "diseqFundingCoefficient",
        "cumulativeDiseqFundingRate",
        "intrinsicValue",
        "cumulativePremiumFundingRate",
        "timeValue",
        "tradersNetVolume",
        "tradersNetCost",
        "quote_balance_premium",
        "volatility"]

    for (let i = 0; i < symbols[0].length; i++) {
        let d = [keys[i]]
        for (let j = 0; j < symbols.length; j++)
            d.push(symbols[j][i])
        data.push(d)
    }
    return (
        <div>
        <h3>Symbols</h3>
        <table border="1">
            {data.map(s =>
                (<tr>
                    {s.map(ss => <td>{ss}</td>)}
                </tr>)
            )}
        </table>
        </div>
    )
}

export default Symbols
