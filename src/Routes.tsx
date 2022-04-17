
import './common/index.css';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

import Home from './pages/Home';
import StudentInfo from './pages/StudentInfo';
import VaccineManage from './pages/VaccineManage';
import AreaManage from './pages/AreaManage';
export function RoutesComponent() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home/" caseSensitive={false} element={<Home />} />
        <Route path="/student" caseSensitive={false} element={<StudentInfo />} />
        <Route path="/vaccine" caseSensitive={false} element={<VaccineManage />} />
        <Route path="/area" caseSensitive={false} element={<AreaManage />} />
      </Route>
      <Route path="/Login" caseSensitive={false} element={<Login />} />
    </Routes>
  </BrowserRouter>
}


