import React, { useEffect,useRef} from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'reactstrap';
import { useState } from 'react/cjs/react.development';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.scss'

Tablee.propTypes = {
    apiList : PropTypes.array,
    onHandleDelete: PropTypes.func,
    onHandleUpdate : PropTypes.func,
};

Tablee.defaultProps = {
    apiList : [],
    onHandleDelete: null,
    onHandleUpdate: null
}


function Tablee(props) {
    const {apiList,onHandleDelete,onHandleUpdate} = props;

    const [title,setTitle] = useState([]);

    const tempt = useRef({});

    useEffect(() => {
        setTitle(apiList[0] ?[...Object.keys(apiList[0])] : [])
    },[apiList])


    const handleDelete = (id) => {
        const btn = document.getElementById('btn'+id);
        const btnDel = document.getElementById('btnDel'+id);
        const name = document.getElementById('name'+id);
        const des = document.getElementById('des'+id);
        const price = document.getElementById('price'+id);

        if(btnDel.innerText === "Delete"){
            if(onHandleDelete){
                onHandleDelete(id);
            }   
        }else{
            name.innerHTML= tempt.current.name;
            des.innerHTML= tempt.current.description;
            price.innerHTML = tempt.current.price;

            btn.innerText="Update"
            btnDel.innerText="Delete"
        }
        
    }

    const handleUpdate = (id) => {
        const btn = document.getElementById('btn'+id);
        const btnDel = document.getElementById('btnDel'+id);
        const name = document.getElementById('name'+id);
        const des = document.getElementById('des'+id);
        const price = document.getElementById('price'+id);
        
        const nameVal = name.innerHTML;
        const desVal = des.innerHTML;
        const priceVal = price.innerHTML;

        console.log(name);
        tempt.current={
          
                name: nameVal,
                description: desVal,
                price: priceVal
         
        }

          console.log(tempt.current);

        const data= apiList.find(api => api.id === id);
        console.log(data)
        
        if(btn.innerText==="Update"){
            btn.innerText="Save";
            btnDel.innerText="Back"
    
            name.innerHTML = "<input type='text' id='inputName"+id+"' value='"+nameVal+"'>";
            des.innerHTML = "<input type='text' id='inputDes"+id+"' value='"+desVal+"'>";
            price.innerHTML = "<input type='text' id='inputPrice"+id+"' value='"+priceVal+"'>";
          
        }else{
            const nameVal = document.getElementById('inputName'+id).value;
            const desVal = document.getElementById('inputDes'+id).value;
            const priceVal = document.getElementById('inputPrice'+id).value;
            

            if(onHandleUpdate){
                if(nameVal.trim()!==''&&desVal.trim()!==''&&priceVal.trim()!==''){
                    
                    setTimeout(()=>{
                        name.innerHTML = nameVal;
                        des.innerHTML = desVal;
                        price.innerHTML = priceVal;
                        btn.innerText="Update"
                        btnDel.innerText="Delete"
                    },700);
                    const value ={
                        ...data,
                        name: nameVal.trim(),
                        description: desVal.trim(),
                        price: priceVal.trim()
                    }
                    onHandleUpdate(id,value);
                }else{
                    alert('Dữ liệu không được bỏ trống')
                }
               
            }

        }
    }

  

    return (
        <div>
            <Table className="table" responsive hover>
                <thead>
                    <tr>
                        {
                            title.map(column => {
                                return (
                                    <th key={column}>{column}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                        {
                            apiList.map(row => {
                                const idName = `name${row.id}`;
                                const idDes = `des${row.id}`;
                                const idPrice = `price${row.id}`;
                                const idBtn =`btn${row.id}`;
                                const idBtnDel =`btnDel${row.id}`;
                                return (
                                    <tr key={row.id} id={row.id} className="table_row">
                                         <td>{row.id}</td>
                                         <td id={idName}>{row.name}</td>
                                         <td id={idDes}>{row.description}</td>
                                         <td id={idPrice}>{row.price}</td>
                                         <td>{row.createdAt}</td>
                                         <td>{row.updatedAt}</td>
                                         <td style={{width: "100px"}}>
                                             <div className="table_row_button">
                                                <Button  id={idBtn} name={row.id} onClick={()=>handleUpdate(row.id)}  color="warning">Update</Button>
                                             </div>
                                         </td>
                                         <td style={{width: "100px"}}>
                                             <div className="table_row_button">
                                                <Button id={idBtnDel}  name={row.id} onClick={()=>handleDelete(row.id)}   color="danger">Delete</Button>
                                             </div>
                                         </td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </Table>
        </div>
    );
}

export default Tablee;
