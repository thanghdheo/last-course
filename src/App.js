import React, {Suspense, useEffect,useState} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import axios from "axios"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const apiUrl = "https://tgt-commerce-server.herokuapp.com/api/products";

  const [listApi,setListApi] = useState([null]);

  const getApi = () => {
    axios(apiUrl)
      .then(reponse => setListApi(reponse.data))
  }

 
  useEffect(()=>{
    getApi()
  },[]);  

  const handleDelete =async (id) => {
    console.log(`${apiUrl}/${id}`)
    
    await axios.delete(`${apiUrl}/${id}`)
    const find = listApi.filter(list => list.id !== id);
    const newList = [...find];
    setListApi([...newList]);
  }

  const handleUpdate = async (id,newApi) => {
    await axios.patch(`${apiUrl}/${id}`,newApi)
    .then(reponse => console.log(reponse.data))

    const newData = [...listApi];

    const find = newData.findIndex(data => data.id === id);
    newData[find] = {...newApi};

    const check = listApi.some(data => data.name === newData[find].name && data.description === newData[find].description && data.price === newData[find].price);

    console.log(check)
    if (!check) {
      setListApi([...newData])
    }
    
  }

  const Tablee =  React.lazy(()=> import('./Components/Table'))

  return (
    <div className="container-fluid">
      <Suspense fallback={<div>...loading</div>}>
        <Router>
          <div className="mt-2 mb-2"><span style={{color:"red"}}>{listApi.length}</span> items</div>
          < Tablee onHandleUpdate={handleUpdate} onHandleDelete={handleDelete} apiList={listApi} />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
