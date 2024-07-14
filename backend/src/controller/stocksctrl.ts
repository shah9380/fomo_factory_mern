import Stock from '../models/Stock'
import axios from 'axios'

const api_key_1 = 'f75a8bf3-8037-4c7f-ac56-ce8fd605f95e' //
const api_key_2 = '6b35a59e-afc2-4a0b-9e12-c9ddc9129c53' //
const api_key_3 = 'fda7544f-39bb-4e03-8c05-abc3c46dd16d' //
const api_key_4 = 'f97b30e3-0af5-4407-9d6f-fde6dbd4e81e' //

const apiKeys = [
    {
        key: 'f75a8bf3-8037-4c7f-ac56-ce8fd605f95e',
        startHour: 0,
        endHour: 6
    },
    {
        key: '6b35a59e-afc2-4a0b-9e12-c9ddc9129c53',
        startHour: 6,
        endHour: 12
    },
    {
        key: 'fda7544f-39bb-4e03-8c05-abc3c46dd16d',
        startHour: 12,
        endHour: 18
    },
    {
        key: 'f97b30e3-0af5-4407-9d6f-fde6dbd4e81e',
        startHour: 18,
        endHour: 24
    }
]

function getCurrentApiKey(){
    const now = new Date(); //current time
    const currentHour = now.getHours(); // will give hours in a digit
    const currentApiKey = apiKeys.find(item => currentHour >= item.startHour && currentHour < item.endHour);

    if(currentApiKey){
        return currentApiKey.key;
    } else {
        console.log("No Api Key found")
        return null;
    }

}

export async function fetchStocksData(){
    try {
            const api_key = getCurrentApiKey();
            // console.log(api_key);
            const response = await axios.post('https://api.livecoinwatch.com/coins/list', {
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 5,
                meta: true
            }, {
                headers: {
                    'x-api-key': `${api_key}`
                }
            })
            const stocksData = response.data;
            

            await Stock.insertMany(stocksData.map((stock: any) => ({
                symbol: stock.name.toLowerCase(),
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
        const now = new Date();
        const deleteBefore  = new Date(now.getTime() - (3 * 60000))
        await Stock.deleteMany({createdAt : {$lt : deleteBefore}});
        console.log("all data has been deleted")
    } catch (error) {
        console.error("error in deleting the data", error);
    }
}

export async function getLatestData(req : any, res: any){
    try {
        const {symbol} = req.params;
        console.log(req.params);
        const data = await Stock.find({ symbol }).sort({timestamp : -1}).limit(20);
        res.status(200).json(data);
    } catch (error) {
        console.error("unable to fetch the data : error ", error);
    }
}