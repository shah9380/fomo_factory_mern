import React from 'react'

export default function MyCard(){
  return (
    <div className="max-w-3xl mx-auto rounded-lg shadow-lg p-6 grow md:mx-12">
    <h2 className="text-2xl font-bold mb-4">Project Description</h2>

    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Overview:</h3>
      <p className="text-slate-300">As part of the technical assessment for the Backend Developer role at FomoFactory, I developed a mini-website designed to collect and display real-time price data for stocks or cryptocurrencies. The project leverages  Express, TypeScript, and Redux, adhering strictly to best practices and project requirements.</p>
    </div>

    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Technical Implementation:</h3>

      <div className="ml-4">
        <p className="font-semibold mb-1">Backend:</p>
        <ul className="list-disc ml-4">
          <li className='text-slate-300'><strong>Real-time Data Polling:</strong> Implemented using WebSocket for efficient real-time data updates.</li>
          <li className='text-slate-300'><strong>Data Fetching:</strong> Utilized Node-cron for scheduled fetching of data from chosen APIs (e.g., LiveCoinWatch, CoinGecko).</li>
          <li className='text-slate-300'><strong>Database Management:</strong> Integrated MongoDB for storing real-time data entries.</li>
          <li className='text-slate-300'><strong>Data Handling:</strong> Implemented a function to manage database entries, ensuring data older than five minutes is automatically purged.</li>
        </ul>
      </div>

      <div className="ml-4 mt-4">
        <p className="font-semibold mb-1">Frontend:</p>
        <ul className="list-disc ml-4">
          <li className='text-slate-300'><strong>Dynamic Table Display:</strong> Displayed the most recent 20 real-time data entries from MongoDB.</li>
          <li className='text-slate-300'><strong>Real-time Updates:</strong> Achieved using WebSocket to dynamically update table values based on new data.</li>
          <li className='text-slate-300'><strong>User Interaction:</strong> Included a modal/popup with a button to enable users to switch between stocks or cryptocurrencies.</li>
        </ul>
      </div>

    </div>

    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Additional Details:</h3>
      <ul className="list-disc ml-4">
        <li className='text-slate-300'><strong>Technology Stack:</strong> Express, TypeScript, Redux.</li>
        <li className='text-slate-300'><strong>Persistence:</strong> Managed state using Redux, storing all state in localStorage to maintain consistency and avoid reliance on useState().</li>
        <li className='text-slate-300'><strong>Documentation:</strong> Included a comprehensive README in the GitHub repository detailing installation and execution steps for local testing.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Project Impact:</h3>
      <p className='text-slate-300'>The project demonstrated proficiency in integrating diverse technologies to create a robust, real-time data visualization tool. It showcases an ability to handle complex technical requirements while adhering to industry best practices and ensuring scalability and performance.</p>
      <p className='text-slate-300'>This project aligns with FomoFactory’s innovative approach to perpetual futures trading, emphasizing scalability and cutting-edge technology integration.</p>
    </div>

  </div>
  )
}