import Stock from '../models/Stock'
import axios from 'axios'

// const api_url = 'https://api.coingecko.com/api/v3/simple/price';
// const symbols = ['bitcoin', 'ethereum', 'litecoin', 'ripple', 'dogecoin']

export async function fetchStocksData(){
    const symbols = ['btc']
    try {
        const promises = symbols.map(async (item) => {
            const response = await axios.post('https://api.livecoinwatch.com/coins/single', {
                currency: "USD",
                code: "BTC",
                meta: true
            }, {
                headers: {
                    'x-api-key': '6b35a59e-afc2-4a0b-9e12-c9ddc9129c53'
                }
            })

            return({
                symbol: item,
                price: response.data.rate
            })
        });

        const stocksData = await Promise.all(promises);
       
    } catch (error) {
        console.log(error)
    }
}