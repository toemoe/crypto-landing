import { useEffect, useState, createContext, useContext } from 'react';
import { CryptoFakeFetch, FetchAssets } from '../api';
import { percentDifference } from '../utils';

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
    addAsset: () => {},
});

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    function mapAssets(assetList, result) {
        return assetList.map((asset) => {
            const coin = result.find((c) => c.id === asset.id);
            return {
                grow: asset.price < coin.price,
                growpercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset,
            };
        });
    }

    useEffect(() => {
        async function preload() {
            setLoading(true);
            const { result } = await CryptoFakeFetch();
            const assets = await FetchAssets();
            setAssets(mapAssets(assets, result));
            setCrypto(result);
            setLoading(false);
        }
        preload();
    }, []);

    function addAsset(newAsset) {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto));
    }

    return (
        <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
            {children}
        </CryptoContext.Provider>
    );
}

export default CryptoContext;
export function useCrypto() {
    return useContext(CryptoContext);
}
