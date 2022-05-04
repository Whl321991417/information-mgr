import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import "./index.scss";
export default function Layout() {
  let location = useLocation();
  const pathName = location.pathname.split("/")[1];
  const isLogin = localStorage.getItem('token')
  let navigate = useNavigate();

  // useState()
  useEffect(() => {
    if (!isLogin && pathName !== '') {
      navigate('/login')
      return
    }
  }, [pathName])
  return (
    <div className="wrapper">
      <div className="header">
        <Header />
      </div>

      <div className="content">
        <Outlet />
      </div>

    </div>
  );
}