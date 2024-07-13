import Stock from '../models/Stock'
import axios from 'axios'

// const api_url = 'https://api.coingecko.com/api/v3/simple/price';
// const symbols = ['bitcoin', 'ethereum', 'litecoin', 'ripple', 'dogecoin']

export async function fetchStocksData(){
    const symbols = ['BTC', 'ETH', 'LTC', 'DOGE', 'XRP']
    try {
            const response = await axios.post('https://api.livecoinwatch.com/coins/list', {
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 5,
                meta: true
            }, {
                headers: {
                    'x-api-key': '6b35a59e-afc2-4a0b-9e12-c9ddc9129c53'
                }
            })
            const stocksData = response.data;
            

            await Stock.insertMany(stocksData.map((stock: any) => ({
                symbol: stock.name,
                price: stock.rate
            })))
       

            //for clearing purpose
            // await Stock.deleteMany()
            console.log("data fetched and successfully stored");

    } catch (error) {
        console.log(error)
    }
};


export async function deleteTheData(){
    try {
        await Stock.deleteMany();
        console.log("all data has been deleted")
    } catch (error) {
        console.error("error in deleting the data", error);
    }
}