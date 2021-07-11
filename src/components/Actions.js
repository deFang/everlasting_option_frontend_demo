import {useState} from 'react'

const Actions = ({onMint, onApprove, onAddLiquidity, onRemoveLiquidity, onAddMargin, onRemoveMargin, onTrade, onLiquidate}) => {
    const [liquidity, setLiquidity] = useState(0)
    const [margin, setMargin] = useState(0)
    const [symbolId, setSymbolId] = useState(0)
    const [volume, setVolume] = useState(0)
    const [address, setAddress] = useState('')
    return (
        <div>
            <h3>Actions</h3>
            <table>
                <tr>
                    <td></td>
                    <td></td>
                    <td><button onClick={() => onMint()}>Mint BToken</button></td>
                    <td><button onClick={() => onApprove()}>Approve</button></td>
                </tr>
                <tr>
                    <td>Liquidity</td>
                    <td><input type='text' value={liquidity} onChange={(e) => setLiquidity(e.target.value)} /></td>
                    <td><button onClick={() => onAddLiquidity(liquidity)}>AddLiquidity</button></td>
                    <td><button onClick={() => onRemoveLiquidity(liquidity)}>RemoveLiquidity</button></td>
                </tr>
                <tr>
                    <td>Margin</td>
                    <td><input type='text' value={margin} onChange={(e) => setMargin(e.target.value)} /></td>
                    <td><button onClick={() => onAddMargin(margin)}>AddMargin</button></td>
                    <td><button onClick={() => onRemoveMargin(margin)}>RemoveMargin</button></td>
                </tr>
                <tr>
                    <td>SymbolId & Volume</td>
                    <td><input type='text' value={symbolId} onChange={(e) => setSymbolId(e.target.value)} /></td>
                    <td><input type='text' value={volume} onChange={(e) => setVolume(e.target.value)} /></td>
                    <td><button onClick={() => onTrade(symbolId, volume)}>Trade</button></td>
                </tr>
            </table>
            <input type='text' size='67' value={address} onChange={(e) => setAddress(e.target.value)} />
            <button onClick={() => onLiquidate(address)}>Liquidate</button>
        </div>
    )
}

export default Actions
