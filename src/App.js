import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import DisplayCoins from "./components/DisplayCoins";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DisplayInfo  from "./components/DisplayInfo";
function App() {
  const [coins, setCoins] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setCoins(res.data);
      console.log(res.data,typeof res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
   
  return (
    < BrowserRouter>
      <Routes>
         <Route exact path="/" element={<DisplayCoins coins={coins}  />}></Route>
        <Route exact path="/moreinfo/:id" element={<DisplayInfo/>}></Route>
      </Routes>
   </ BrowserRouter >
);
}

export default App;