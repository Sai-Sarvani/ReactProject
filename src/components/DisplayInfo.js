import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next"
import axios from "axios"


const DisplayInfo = () => {
  const [information, setInformation] = useState([])
  let params = window.location.pathname.split("/")[2]
  const desctiptionFormatter = (cell, row) => {
    return <span>{cell.sv.split("</a>")[0]}</span>
  }
  const marketCapFormatter = (cell, row) => {
    return <span>${cell.market_cap.eur.toLocaleString()}</span>
  }
  const columns = [
    { dataField: "name", text: "Coin", sort: true },
    { dataField: "symbol", text: "Symbol", sort: true },
    { dataField: "hashing_algorithm", text: "Hashing_Algorithm", sort: true },
    { dataField: "description", text: "Description", sort: true, formatter: desctiptionFormatter },
    { dataField: "market_data", text: "MarketCap_Euro", sort: true, formatter: marketCapFormatter },
    { dataField: "genesis_date", text: "Genesis_Date", sort: true }
  ]


  const getData = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params}`
      );
      let result = []
      result.push(res.data)
      setInformation(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>

      <BootstrapTable keyField="name" className="table table-dark mt-4 table-hover" data={information} columns={columns} />


    </React.Fragment>


  )
}
export default DisplayInfo