
const PoolInfo = ({poolinfo}) => {
    return (
        <div>
            <h3>Pool Info</h3>
            <table border="1">
            <tbody>
                <tr>
                    <th>Balance</th>
                    <th>LTokenTotalSupply</th>
                    <th>PTokenTotalSupply</th>
                    <th>ActiveSymbolIds</th>
                    <th>NumPositionHolders</th>
                    <th>Liquidity</th>
                    <th>ProtocolFeeAccrued</th>
                </tr>
                <tr>
                    <td>{poolinfo.balance}</td>
                    <td>{poolinfo.lTokenTotalSupply}</td>
                    <td>{poolinfo.pTokenTotalSupply}</td>
                    <td>[{poolinfo.activeSymbolIds && poolinfo.activeSymbolIds.toString()}]</td>
                    <td>[{poolinfo.numPositionHolders && poolinfo.numPositionHolders.toString()}]</td>
                    <td>{poolinfo.liquidity}</td>
                    <td>{poolinfo.protocolFeeAccrued}</td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}

export default PoolInfo
