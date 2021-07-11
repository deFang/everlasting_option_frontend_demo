
const AccountInfo = ({accountInfo}) => {
    return (
        <div>
            <h3>Account Info</h3>
            <table border="1">
                <tr>
                    <th>Balance</th>
                    <th>LTokenBalance</th>
                    <th>Margin</th>
                </tr>
                <tr>
                    <td>{accountInfo.balance}</td>
                    <td>{accountInfo.lTokenBalance}</td>
                    <td>{accountInfo.margin}</td>
                </tr>
            </table>
        </div>
    )
}

export default AccountInfo
