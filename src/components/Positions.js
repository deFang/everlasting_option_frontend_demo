
const Positions = ({symbols, positions}) => {
    let data = []
    let keys = ['Volume', 'Cost', 'LastCumulativeFundingRate']

    let d = ['Symbol']
    for (let i = 0; i < symbols.length; i++)
        d.push(symbols[i][1])
    data.push(d)

    for (let i = 0; i < 3; i++) {
        d = [keys[i]]
        for (let j = 0; j < positions.length; j++)
            d.push(positions[j][i])
        data.push(d)
    }
    return (
        <div>
            <h3>Positions</h3>
            <table border="1">
                {data.map(p => (
                    <tr>
                        {p.map(pp => <td>{pp}</td>)}
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Positions
