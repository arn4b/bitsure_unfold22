import './App.css';
import { useState, useEffect } from 'react'; 
import { Routes, Route, Link, Redirect } from "react-router-dom";


import { toHex, truncateAddress } from "./utils";


import { NFTStorage, File } from 'nft.storage'
import ConnecteToWallet from './Components/ConnecteToWallet';
import Profile from './Components/Profile';
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIyMUQ0NzVEM0YwNjA5ODdhMDY5M2NDMzcwNjk5MEYxYjFmRTVhQjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjY1MjY5NCwibmFtZSI6InVuZm9sZDJrMjIifQ.FXp1QixsHFfDKXwDTaiYxvcvlFzRbiEOCzcF3JgdUwg' })

async function main() {
  const metadata = await client.store(
  {
    attributes: [
      {
        "color": "red",
        "value": "gaming mania"
      }
    ],
    description: "logo gaming mania",
    name: "Gaming Mania",
    image: new File(
      [
        /* data */
      ],
      'pinpie.jpg',
      { type: 'image/jpg' }
    ),
  })

  console.log(metadata.url)
  // ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
}

function App() {


  main();

  return (
    <div className="App">
      <>Unfold 2k22</>
      <ConnecteToWallet />

      <Routes>
        <Route path="profile" exact element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;