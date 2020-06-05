/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState,useEffect} from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Modal from "react-responsive-modal";


import Card from "../components/Card/Card.jsx";

const SupplierList = () => {

const [suppliers, setSuppliers] = useState([])
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [status, setStatus] = useState("");
const [tempSupplier,setTempSupplier]=useState("")
const [open, setOpen] = useState(false)

const [sRevenue, setSRevenue] = useState();
const [sOrder, setSOrder] = useState()
const [productCount, setProductCount] = useState()

useEffect(()=>{
getSupplierData()
},[])

const getSupplierData =  async () =>{

  axios.get('/api/supplierFullDetails')
  .then(res=>{
    setSuppliers(res.data)
  })
   //  let supplierArr = [];
   //  let finalArr = []
   //
   // const supplierData = await axios.get('/api/supplier')
   //
   //  supplierData.data.forEach(async (item, i) => {
   //    const productLength = await axios.get('/api/supplier/product/' + item._id)
   //
   //    const supplierRevenue = await axios.get('/supplierRevenue/'+item._id);
   //
   //    const supplierOrder = await axios.get('/supplierOrders/'+item._id)
   //
   //    const supplierObj =  {
   //      id:item._id,
   //      email:item.email,
   //      supplier_id: item.supplier_id,
   //      order: supplierOrder.data,
   //      product: productLength.data.length,
   //      revenue: supplierRevenue.data
   //    }
   //    supplierArr.push(supplierObj)
   //  });
   //
   //  return supplierArr;

}

const updateSupplier = item =>{
  console.log(item._id)
  setOpen(true)
  setEmail(item.email)
  setName(item.supplier_id)
  setTempSupplier(item._id)
}

const submitUpdateSuplier = (e)=>{
  e.preventDefault();
  const obj = {
    _id:tempSupplier,
    supplier_id: name,
    email: email,
    password: password
  }
  console.log(obj)
  axios
  .patch('/api/update', obj)
  .then(data=>{
    if (data) {
      setStatus("Supplier Updated Successfully")
      setOpen(false)
    }
  })
}



const handleClickMe = ()=>{
}


const updatebtn= {
  width: "50%"
}
    return (
      <div className="content">

      <div className="info text-center" style={{color:"red"}}>{status}</div>

        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Supplier List"
                category={"Total Suppliers :"+ suppliers.length}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover size="sm">
                    <thead >
                      <tr>
                      <th>S.No.</th>
                        <th>username</th>
                        <th>Email</th>
                        <th>Total no. of Products</th>
                        <th>Total no. of Orders</th>
                        <th>total Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {suppliers.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td>{key+1}</td>
                            <td>{item.supplier_id}</td>
                            <td>{item.email}</td>
                            <td>{item.product}</td>
                            <td>{item.order}</td>
                            <td>{item.revenue}</td>
                            <td><button className="btn btn-primary btn-sm" onClick={()=>updateSupplier(item)}>Edit</button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
        <Modal open={open} onClose={()=>setOpen(false)}>
        <br/>
        <h3 style={{color:"blue"}}className="text-center">Edit Supplier Details:</h3>
        <form  onSubmit={submitUpdateSuplier} >
          <div className='fullName'>
            <label htmlFor="fullName">Supplier Id</label>
            <input type='text' name='fullName' value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className='email'>
            <label htmlFor="email">Email</label>
            <input type='email' name='email'  value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className='password'>
            <label htmlFor="password">New Password</label>
            <input type='password' name='password'  value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div style={{margin:"auto"}}>
            <button type="submit" className="btn btn-primary" style={updatebtn}>Update</button>
          </div>

        </form>
        </Modal>



      </div>
    );

}

export default SupplierList;
