
import './common/index.css';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

import Home from './pages/Home';
import News from './pages/Home/News';
import Piyao from './pages/Home/Piyao';
import Safa from './pages/Home/Safa';
import Today from './pages/Home/Today';

import Checked from './pages/Checked';
import Infstudents from './pages/Checked/infstudents';
import Infclassroom from './pages/Checked/infclassroom';
import Infdorm from './pages/Checked/infdorm';
import Vaccin from './pages/Checked/vaccin';


import Manage from './pages/Manage';
import Manageclassroom from './pages/Manage/manageclassroom';
import Managefloor from './pages/Manage/managefloor';
import Managestudents from './pages/Manage/managestudents';


import MyInf from './pages/MyInf';
import Myinformation from './pages/MyInf/myinformation';
export function RoutesComponent() {
  
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home/" caseSensitive={false} element={<Home />}>
          <Route path="news" caseSensitive={false} element={<News />} />
          <Route path="piyao" caseSensitive={false} element={<Piyao />} />
          <Route path="safe" caseSensitive={false} element={<Safa />} />
          <Route path="today" caseSensitive={false} element={<Today />} />
        </Route>

        <Route path="/check" caseSensitive={false} element={<Checked />} >
          <Route path="infstudents" caseSensitive={false} element={<Infstudents />} />
          <Route path="infclassroom" caseSensitive={false} element={<Infclassroom />} />
          <Route path="infdorm" caseSensitive={false} element={<Infdorm />} />
          <Route path="vaccin" caseSensitive={false} element={<Vaccin />} />
        </Route>
        <Route path="/manage" caseSensitive={false} element={<Manage />} >
          <Route path="manageclassroom" caseSensitive={false} element={<Manageclassroom />} />
          <Route path="managefloor" caseSensitive={false} element={<Managefloor />} />
          <Route path="managestudents" caseSensitive={false} element={<Managestudents />} />
        </Route>
        <Route path="/myinf" caseSensitive={false} element={<MyInf />} >
          {/* <Route path="myinformation" caseSensitive={false} element={<Myinformation />} /> */}
        </Route>

      </Route>
      <Route path="/Login" caseSensitive={false} element={<Login />} />
    </Routes>
  </BrowserRouter>
}


