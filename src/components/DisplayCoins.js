import React from "react";
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Link, useNavigate } from "react-router-dom"

function HeaderFormatter(column, colIndex) {
  return (
    <span>$$ {column.text} $$</span>
  );
}

function priceFormatter(cell, row) {
  return (
    <span>$ {cell.toLocaleString()}</span>
  );
}
function priceChangeFormatter(cell, row) {
  return (
    <span className={
      "text-warning"
    }>$ {cell.toLocaleString()}</span>
  );
}
function imageFormatter(cell, row) {
  return (
    <span><img
      src={cell}
      alt=""
      className="img-fluid me-4 "
      style={{ width: "20px" }}
    />
    </span>
  );
}


const DisplayCoins = ({ coins, search }) => {
  const navigate = useNavigate()

  const getMore = (id) => {
    <Link to={`/moreinfo/${id}`} />


  };
  const columns = [

    {
      dataField: "image", text: "", formatter: imageFormatter
    },
    {
      dataField: "name", text: "Coin", sort: true
    },
    { dataField: "symbol", text: "Symbol" },
    { dataField: "current_price", text: "Price", sort: true, formatter: priceFormatter, headerFormatter: HeaderFormatter, headerStyle: { width: "12%" } },
    { dataField: "high_24h", text: "High_24Hour_price", sort: true, formatter: priceChangeFormatter, headerFormatter: HeaderFormatter, headerStyle: { width: "20%" } },
    { dataField: "low_24h", text: "Low_24Hour_Price", sort: true, formatter: priceChangeFormatter, headerFormatter: HeaderFormatter, headerStyle: { width: "20%" } }
  ]
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );
  if (!coins) return <div>no coins</div>
  const options = {
    paginationSize: 9,
    pageStartIndex: 0,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '10', value: 10
    }, {
      text: '20', value: 20
    }, {
      text: 'All', value: coins.length
    }]
  };
  const rowEvents = {
    onClick: (e, column, columnIndex, row, rowIndex) => {
      
      navigate(`/moreinfo/${column.id}`)
      

    },
    
  };
  return (
    <React.Fragment>
      <BootstrapTable className="table table-dark mt-4 table-hover" data={coins} columns={columns} keyField="id" pagination={paginationFactory(options)} rowEvents={rowEvents} />
    </React.Fragment>);
};

export default DisplayCoins;