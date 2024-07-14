// src/App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
    const [data, setData] = useState<any[]>([]); // Replace `any[]` with your data type

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fomo-factory-2jei.onrender.com/api/stocks/data/bitcoin'); // Replace with your API endpoint
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // WebSocket connection
    useEffect(() => {
        const ws = new WebSocket('wss://fomo-factory-2jei.onrender.com'); // Replace with your WebSocket server URL

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received WebSocket message:', message);

            // Update state with new data
            setData(message.data);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="App">
            <h1>Stock Data</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <strong>Symbol:</strong> {item.symbol}, <strong>Price:</strong> {item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
