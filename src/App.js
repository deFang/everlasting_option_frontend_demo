import {useState, useEffect} from 'react'
import Web3 from 'web3'
import abis from './utils/abis'

import {TERC20, Pricing, LTokenLite, PTokenLite, EverlastingOption} from './utils/ABI.json'

import PoolInfo from './components/PoolInfo'
import Symbols from './components/Symbols'
import AccountInfo from './components/AccountInfo'
import Positions from './components/Positions'
import Actions from './components/Actions'

function fromWei(value, unit='ether') {
    return Web3.utils.fromWei(value, unit)
}

function toWei(value, unit='ether') {
    return Web3.utils.toWei(value, unit)
}

function App() {

    const web3 = new Web3(window.ethereum)


    const bToken = new web3.eth.Contract(TERC20,            '0x594abb4c4e9Ab8bDB81F64d8b392fc2448545071')
    const lToken = new web3.eth.Contract(LTokenLite,       '0x9169Eb9F8a91E927052f34B5f3b577aDaF560Cb3')
    const pToken = new web3.eth.Contract(PTokenLite,       '0x01CBb0D1f0666620C4D016407D5B2F42d1Fa4a1A')
    const pool = new web3.eth.Contract(EverlastingOption,  '0xb1B2172D2998C7557cB939FF6D60B3742c46B5c5')

    const [data, setData] = useState({
        account: '',
        poolinfo: {},
        symbols: [[]],
        accountInfo: {},
        positions: []
    })

    useEffect(() => {
        update()
    }, [])

    const update = async () => {
        const account = await getAccount()
        const poolinfo = await getPoolInfo()
        const symbols = await getSymbols(poolinfo.activeSymbolIds)
        const accountInfo = await getAccountInfo(account)
        const positions = await getPositions(account, poolinfo.activeSymbolIds)
        setData({account, poolinfo, symbols, accountInfo, positions})
    }

    const getAccount = async () => {
        return Web3.utils.toChecksumAddress((await window.ethereum.request({method: 'eth_requestAccounts'}))[0])
    }

    const getPoolInfo = async () => {
        const balance = fromWei(await bToken.methods.balanceOf(pool.options.address).call())
        const lTokenTotalSupply = fromWei(await lToken.methods.totalSupply().call())
        const pTokenTotalSupply = await pToken.methods.totalSupply().call()
        const activeSymbolIds = await pToken.methods.getActiveSymbolIds().call()
        const numPositionHolders = await Promise.all(activeSymbolIds.map(async (id) => {return await pToken.methods.getNumPositionHolders(id).call()}))
        const liquidity = fromWei(await pool.methods.getLiquidity().call())
        const protocolFeeAccrued = fromWei(await pool.methods.getProtocolFeeAccrued().call())
        return {
            balance,
            lTokenTotalSupply,
            pTokenTotalSupply,
            activeSymbolIds,
            numPositionHolders,
            liquidity,
            protocolFeeAccrued
        }
    }


    const getSymbols = async (activeSymbolIds) => {
        return await Promise.all(activeSymbolIds.map(async (id) => {
            let s = await pool.methods.getSymbol(id).call()
            return [
                s[0],
                s[1],
                fromWei(s[3]),
                fromWei(s[4]),
                fromWei(s[5]),
                s[6],
                fromWei(s[7]),
                fromWei(s[8]),
                fromWei(s[9]),
                fromWei(s[10]),
                fromWei(s[11]),
                fromWei(s[12]),
                fromWei(s[13]),
                fromWei(s[14]),
                fromWei(s[15])
            ]
        }))
    }

    const getAccountInfo = async (account) => {
        const balance = fromWei(await bToken.methods.balanceOf(account).call())
        const lTokenBalance = fromWei(await lToken.methods.balanceOf(account).call())
        const margin = fromWei(await pToken.methods.getMargin(account).call())
        return {
            balance,
            lTokenBalance,
            margin
        }
    }

    const getPositions = async (account, activeSymbolIds) => {
        return await Promise.all(activeSymbolIds.map(async (id) => {
            let p = await pToken.methods.getPosition(account, id).call()
            return [
                fromWei(p[0]),
                fromWei(p[1]),
                fromWei(p[2]),
                fromWei(p[3])
            ]
        }))
    }

    const onMint = async () => {
        await bToken.methods.mint(data.account, '10000000000000000000000').send({from: data.account})
        await update()
    }

    const onApprove = async () => {
        const max = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
        await bToken.methods.approve(pool.options.address, max).send({from: data.account})
    }

    const onAddLiquidity = async (value) => {
        await pool.methods.addLiquidity(toWei(value), []).send({from: data.account})
        await update()
    }

    const onRemoveLiquidity = async (value) => {
        await pool.methods.removeLiquidity(toWei(value), []).send({from: data.account})
        await update()
    }

    const onAddMargin = async (value) => {
        await pool.methods.addMargin(toWei(value), []).send({from: data.account})
        await update()
    }

    const onRemoveMargin = async (value) => {
        await pool.methods.removeMargin(toWei(value), []).send({from: data.account})
        await update()
    }

    const onTrade = async (symbolId, volume) => {
        await pool.methods.trade(symbolId, toWei(volume), []).send({from: data.account})
        await update()
    }

    const onLiquidate = async (address) => {
        await pool.methods.liquidate(address, []).send({from: data.account})
        await update()
    }

    return (
        <div className="App">
            <h1>DeriV2 Lite BSC Testnet</h1>
            <PoolInfo poolinfo={data.poolinfo} />
            <Symbols symbols={data.symbols} />
            <AccountInfo accountInfo={data.accountInfo} />
            <Positions symbols={data.symbols} positions={data.positions} />
            <Actions
                onMint={onMint}
                onApprove={onApprove}
                onAddLiquidity={onAddLiquidity}
                onRemoveLiquidity={onRemoveLiquidity}
                onAddMargin={onAddMargin}
                onRemoveMargin={onRemoveMargin}
                onTrade={onTrade}
                onLiquidate={onLiquidate}
            />
        </div>
    );
}

export default App;
