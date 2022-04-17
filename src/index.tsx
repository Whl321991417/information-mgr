
import ReactDOM from 'react-dom';
import { RoutesComponent } from './Routes';
import { Provider } from 'react-redux'
import 'antd/dist/antd.css';
import './common/index.css'
import { store } from './state';
ReactDOM.render(
  <Provider store={store}>
    <RoutesComponent />
  </Provider>
  ,
  document.getElementById('root')
);


