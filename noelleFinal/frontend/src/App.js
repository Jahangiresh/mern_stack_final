import "./app.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./pages/Main";
import About from "./pages/About";
import Footer from "./components/Footer/Footer";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Cartpage from "./pages/Cartpage";
import Blogdetails from "./pages/Blogdetails";
import ScrollToTop from "./components/ScrollToTop";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import ProductScreen from "./components/ProductScreen";
import AdressScreen from "./pages/AdressScreen";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import OrderScreen from "./pages/OrderScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./pages/DashboardScreen";

import AdminRoute from "./components/AdminRoute";
import DashUserScreen from "./pages/DashUserScreen";
import DashProductsScreen from "./pages/DashProductsScreen";
import DashOrdersScreen from "./pages/DashOrdersScreen";
import EditProductScreen from "./pages/EditProductScreen";
import DashAddProducts from "./pages/DashAddProducts";
import DashUserDetails from "./pages/DashUserDetails";
import DashOrderDetails from "./pages/DashOrderDetails";
import DashEmployeeScreen from "./pages/DashEmployeeScreen";
import DashEmployeeDetails from "./pages/DashEmployeeDetails";

function App() {
  if (localStorage.getItem("products") === null) {
    localStorage.setItem("products", JSON.stringify([]));
  }
  let products = JSON.parse(localStorage.getItem("products"));
  const [count, setCount] = useState();
  const [reRender, setReRender] = useState();

  useEffect(() => {
    products.forEach((prod) => {
      setReRender(prod.reRender);
    });
  }, [reRender, products]);

  useEffect(() => {
    products.forEach((prod) => {
      setCount(prod.count);
    });
  }, [count, products]);

  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, [reRender]);
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <ToastContainer position="bottom-center" limit={1} />
        <Header
          count={count}
          setcount={setCount}
          setrerender={setReRender}
          rerender={reRender}
          userinfo={userInfo}
        />
        <Routes>
          <Route
            path="/"
            element={<Main setcount={setCount} setrerender={setReRender} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/shop"
            element={
              <Shop
                setcount={setCount}
                setrerender={setReRender}
                rerender={reRender}
              />
            }
          />
          <Route
            path="/cartpage"
            element={<Cartpage setrerender={setReRender} rerender={reRender} />}
          />
          <Route path="/blog/details" element={<Blogdetails />} />
          <Route
            path="/signin"
            element={<Login setuserinfo={setUserInfo} userinfo={userInfo} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Auth setuserinfo={setUserInfo} userinfo={userInfo} />}
          />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route
            path="/product/:slug"
            element={
              <ProductScreen setcount={setCount} setrerender={setReRender} />
            }
          />
          <Route path="/address" element={<AdressScreen />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistoryScreen />
              </ProtectedRoute>
            }
          />
          {/*admin routes*/}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <DashboardScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/userlist"
            element={
              <AdminRoute>
                <DashUserScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/employeelist"
            element={
              <AdminRoute>
                <DashEmployeeScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/productlist"
            element={
              <AdminRoute>
                <DashProductsScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orderlist"
            element={
              <AdminRoute>
                <DashOrdersScreen />
              </AdminRoute>
            }
          />

          <Route
            path="/product/id/:id"
            element={
              <AdminRoute>
                <EditProductScreen />
              </AdminRoute>
            }
          />
          <Route
            path="admin/addproduct"
            element={
              <AdminRoute>
                <DashAddProducts />
              </AdminRoute>
            }
          />

          <Route
            path="/user/:id"
            element={
              <AdminRoute>
                <DashUserDetails />
              </AdminRoute>
            }
          />
          <Route
            path="/employee/:id"
            element={
              <AdminRoute>
                <DashEmployeeDetails />
              </AdminRoute>
            }
          />

          <Route
            path="/order/details/:id"
            element={
              <AdminRoute>
                <DashOrderDetails />
              </AdminRoute>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
