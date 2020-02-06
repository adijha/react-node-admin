import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Grid, Row, Col, Table, DropdownButton } from "react-bootstrap";
import Modal from "react-responsive-modal";


import Card from "../components/Card/Card.jsx";
import '../assets/css/productPage.css';



const Products= ()=>{


const [productList, setProductList] = useState([]);
const [open, setOpen] = useState(false)
const [singleProduct, setSingleProduct] = useState([]);
const [search, setSearch] = useState('');


useEffect(()=>{
  getProductList();
},[])



const getProductList = () =>{
    axios
    .get('/shopify/product')
    .then(data=>{
      console.log("get api of product list", data);
      setProductList(data.data);
    })

}

const getProductId=(list)=>{
  //console.log(list._id);
  axios.get('/shopify/product/'+list._id)
  .then(item=>{
    console.log("single pronduct detail", item)
    setSingleProduct(item.data)
    setOpen(true)
  })
}

const onCloseModal = ()=>{
  setOpen(false)
}


const filterItems = (productList.filter(plist=>{
  return plist.name.toLowerCase().includes(search.toLowerCase());
}))



const handlClick = (e)=>{
  e.preventDefault();
  let unsorted = filterItems;
  console.log("unsorted", unsorted)
if (e.target.value==="asce") {
   setProductList(filterItems.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price)))
}
else if (e.target.value=="desc") {
  setProductList(filterItems.sort((a,b)=>parseFloat(b.price)-parseFloat(a.price)))
}

}




  return(
    <div className="">
      <div >
        <h2 className="text-center">Product <span style={{color: "#ff9f1a"}}>Collection</span></h2>

        <hr style={{width:"20%", color:"antiquewhite", border:"1px solid"}}/>
        <div className="text-right container arrow" style={{width:"35%", backgroundColor:"antiquewhite", marginLeft:"1rem"}}>
        <ul className="category text-center" style={{listStyle: "none", padding:"1em", position:"relative", display:"flex"}}>
          <li><input  type="search" onChange={(e)=>setSearch(e.target.value)} className="primary" placeholder="search product"/></li>
          <li>
          <select onChange={(e)=>handlClick(e)}>
            <option value="all">All</option>
            <option value="asce">Sort: Highest to Lowest</option>
            <option value="desc">Sort: Lowest to highest</option>
          </select>
          </li>
        </ul>

        </div>

      </div>
      <div className="container-fluid" style={{backgroundColor: "", padding: "6px" , paddingTop:"2em"}}>

    {filterItems.map(list=>{
      return(
        <div className="col-sm-3">
               <article className="col-item item column-item">
                 <div className="photo">
                   <div className="options-cart-round">
                     <button className="btn btn-default" title="Add to cart">
                       <span className="fa fa-eye" onClick={()=>getProductId(list)}/>
                     </button>
                   </div>

                   <a href="#"> <img src={`data:image/jpeg;base64, ${list.productImage[0].imgBufferData}`} className="img-responsive" alt="Product Image" /> </a>

                 </div>
                 <div className="info">
                   <div className="row">
                     <div className="price-details col-md-6">

                       <h1><b>{list.name}</b></h1>
                       <span className="price-new"><b>&#8377;</b>{list.price}</span>

                     </div>
                   </div>
                 </div>
               </article>
             </div>
            )
          })}
          </div>


    <Modal open={open} onClose={()=>setOpen(false)}>

    <div className="container-fluid" >
    {singleProduct.map(product=>{
      return(
        <div className="card card-class">
          <div className="container-fliud">
            <div className=" row">
                  <div className="preview col-md-6">
                  <div className="preview-pic tab-content">
                    <div className="tab-pane active" id="pic-1"><img src={`data:image/jpeg;base64, ${product.productImage[0].imgBufferData}`} /></div>
                    <div className="tab-pane" id="pic-2"><img src={`data:image/jpeg;base64, ${product.productImage[1].imgBufferData}`} /></div>
                  </div>
                  <ul className="preview-thumbnail nav nav-tabs">
                    <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src={`data:image/jpeg;base64, ${product.productImage[0].imgBufferData}`} /></a></li>
                    <li><a data-target="#pic-2" data-toggle="tab"><img src={`data:image/jpeg;base64, ${product.productImage[1].imgBufferData}`} /></a></li>

                  </ul>
                </div>
              <div className="details col-md-6">
                <h3 className="product-title">{product.name}</h3>
                <div className="rating">
                  <div className="stars">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                  <span className="review-no">41 reviews</span>
                </div>
                <p className="product-description">{product.description}</p>
                <h4 className="price">current price: <span>&#x20b9;{product.price}</span></h4>
                <p className="vote"><strong>91%</strong> of buyers enjoyed this product!<br/> <br/><strong>87 votes</strong></p>
                <h5 className="sizes">Available Quantity: <span>{product.quantity}</span>
                </h5>


              </div>
            </div>
          </div>
        </div>
      )
    })}

     </div>

    </Modal>
    </div>
  )
}
export default Products;