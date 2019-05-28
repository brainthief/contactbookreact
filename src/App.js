import React from "react";
// import * as axios from 'axios'
import Header from "./components/Head/Header";
import TableContainer from "./components/Body/BodyContainer/Table/TableContainer";

const App = () => {
  // const statuses = {
  //  NOT_INITIALIZED: 'NOT_INITIALIZED',
  //  ERROR: 'ERROR',
  //  INPROGRESS: 'INPROGRESS',
  //  SUCCESS: 'SUCCESS'
  // }

  // let status = statuses.NOT_INITIALIZED
  // if (status === statuses.NOT_INITIALIZED) {
  //  status = statuses.INPROGRESS
  //  axios
  //   .get('http://localhost/vanilphp/api.php')
  //   .then((res) => {
  //    status = statuses.SUCCESS
  //    console.log(res.data)
  //   })
  // }
  const Table = () => {
    return (
      <>
        <Header />
        <TableContainer />
      </>
    );
  };
  return (
    <div className="container">
      <Table />
    </div>
  );
};

export default App;
