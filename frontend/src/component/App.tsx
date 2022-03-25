import React, { useState, useEffect } from 'react';
import api from '../services/api';

import From from './form';
import List from './list';

export default function App() {


  let [responseData, setResponseData] = useState([]);

  const fetchData = async () => {
    api.fatch().then((response: any) => {
      setResponseData(response.data.data);
      console.log(response.data.data)
    }).catch((error) => {
      console.log(error)
    });
  };

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className="container">
      <h1>CRUD</h1>
      <From fetchData={fetchData} />
      <List responseData={responseData} />
    </div >
  );
};
