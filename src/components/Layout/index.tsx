import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Leftmenu from "../LeftMenu";
import "./index.scss";
export default function Layout() {
  let location = useLocation();
  const pathName = location.pathname.split("/")[1];
  const isLogin = localStorage.getItem('token')
  let navigate = useNavigate();

  // useState()
  useEffect(() => {
    if (!isLogin) {
      navigate('/login')
      return
    }
    switch (pathName) {
      case '':
        navigate('/home/today')
        break;
      case 'check':
        navigate('/check/infstudents')
        break;
      case 'manage':
        navigate('/manage/managestudents')
        break;
      case 'myinf':
        navigate('/myinf/myinformation')
        break;
      default:
        break;
    }
  }, [pathName])
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Leftmenu />
        <div className="main">
          <Outlet />
        </div>

      </div>

    </div>
  );
}