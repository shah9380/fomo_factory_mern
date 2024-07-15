import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrices } from '../redux/actions/priceActions';
import { fetchPricesFailure, fetchPricesRequest, fetchPricesSuccess, setSymbol } from '../redux/reducers/priceReducer';
import { RootState, AppDispatch } from '../redux/store';
import io from "socket.io-client";
import './priceTable.css'
import MyCard from './myCard';

const api_url = 'http://localhost:10000';

const socket = io(`${api_url}`);

const PriceTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error, symbol } = useSelector((state: RootState) => state.prices);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchPrices(symbol));
  }, [dispatch, symbol]);

  useEffect(()=>{

    socket.on('connect',() => {
        console.log("Hurray! Connected to Socket you're ready to use misbah's aplication")
    })
    socket.on("UPDATE_DATA", (message : { type: string; data: any[]}) => {
        console.log("we have message", message);
        if(message.type === "UPDATE_DATA"){
            dispatch(fetchPricesRequest());
            try {
                let newData = message.data.filter((item)=> item.symbol === symbol);
                dispatch(fetchPricesSuccess([...newData,...(data.slice(0, -1))]))
            } catch (error: any) {
                dispatch(fetchPricesFailure(error?.message))
            }
        }
    })

    socket.on('disconnect', ()=>{
        console.log("Disconnected from socket")
    })
  })

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSymbol(e.target.value));
    setModalIsOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-slate-500 to-slate-800 text-white flex justify-around items-start flex-wrap">
      <div className="flex flex-col justify-center items-center grow">
        <h1 className="text-4xl p-4 text-center font-bold from-red-900 via-white to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
          <span className="from-orange-400 via-white to-white/30 bg-gradient-to-r bg-clip-text text-transparent">
            {symbol.toUpperCase()}
          </span>{" "}
          Live Tracker
        </h1>
        <div>
          <button className="button-33" onClick={() => setModalIsOpen(true)}>
            Change Pairs
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {/* <div className='bg-gray-800 rounded-md table-auto flex justify-center items-center p-4 text-center'> */}
        <table className="w-[350px] text-center rounded-xl m-4">
          <thead>
            <tr className="border-t-4 border-b-2 bg-slate-900 border-black font-thin border-separate border-spacing-y-4 border-spacing-x-0">
              <th className="py-2 font-normal">#</th>
              <th className="py-2 font-normal">Time</th>
              <th className="py-2 font-normal">Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((price, index) => (
              <tr
                className={`border-2 ${index === 0 ? "drop-animation" : ""} ${
                  index === data.length - 1 ? "disappear-animation" : ""
                }`}
                key={price.timestamp}
              >
                <td>{index + 1}</td>
                <td>{new Date(price.timestamp).toLocaleTimeString()}</td>
                <td>{price.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MyCard></MyCard>
      {/* </div> */}

      <div className={`w-screen h-screen fixed bg-black/40 ${modalIsOpen ? '': 'hidden'}`} onClick={(event) => { event.stopPropagation(); setModalIsOpen(false)}}>
        <div className='bg-black/80 z-50 w-80 shadow-inner shadow-white rounded-xl h-80 p-8 absolute flex flex-col justify-between items-stretch text-black translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]' onClick={(event) => event.stopPropagation()}>
            <div>
                <label htmlFor="pairs" className='text-white'>Change Pair</label>
                <select id='pairs' className='w-full my-2 h-10 bg-slate-300 outline-none border-none rounded-md' onChange={handleSymbolChange} value={symbol}>
                <option value="bitcoin">BTC</option>
                <option value="ethereum">ETH</option>
                <option value="solana">SOL</option>
                <option value="tether">Tether</option>
                <option value="bnb">BNB</option>
                </select>
            </div>
            <button className='text-white border-slate-300 border rounded-md hover:bg-slate-600/35'  onClick={(event) => {event.stopPropagation(); setModalIsOpen(false)}}>close</button>
        </div>
      </div>
    </div>
  );
};

export default PriceTable;
