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
import Dashboard from "./views/Dashboard.jsx";
import AddOnProduct from "./views/AddProduct.jsx"
import ProductList from "./views/ProductList.jsx"
import CsvProduct from "./views/CsvProduct.jsx"
import ShopifyProduct from "./views/ShopifyProduct.jsx"
import ProductLayout from "./layouts/Products.jsx";
import Orders from "./views/Orders.jsx"
import FulfilledOrders from "./views/FulfilledOrders.jsx"
import MerchantProfileSetting from "./views/MerchantProfileSetting.jsx"



const dashboardRoutes = [
{/*}  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/merchant"
  },*/},
  {
    path: "/collection",
    name: "Products Colection",
    icon: "pe-7s-bell",
    component: ProductLayout,
    layout: "/merchant"
  },
  {
    path: "/shopifyproduct",
    name: "Shopify Products",
    icon: "pe-7s-bell",
    component: ShopifyProduct,
    layout: "/merchant"
  },{
    path: "/orders",
    name: "orders",
    icon: "pe-7s-bell",
    component: Orders,
    layout: "/merchant"
  },
  {
    path: "/fullfilled",
    name: "Fulfilled Orders",
    icon: "pe-7s-bell",
    component: FulfilledOrders,
    layout: "/merchant"
  },
  {
    path: "/profile-setting",
    name: "Account Details",
    icon: "pe-7s-bell",
    component: MerchantProfileSetting,
    layout: "/merchant"
  }

];
export default dashboardRoutes;
