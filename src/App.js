import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable';
import DataTableAxios from './components/DataTableAxios';
import MyChart from './components/MyChart';
import ReChart from './components/ReChart';
import HighCharts from './components/HighCharts';
import NoConvPage from './components/NoConvPage';

import { Routes, Route } from 'react-router-dom';
// const cors = require("cors");
// DataTable.use(cors());

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<DataTable/>}/>
        <Route path='/high' element={<HighCharts/>}/>
        <Route path='/noconv' element={<NoConvPage/>}/>
      </Routes>
      
      {/* <MyChart/> */}
      {/* <ReChart/> */}
      {/* <HighCharts/> */}
      {/* <DataTableAxios/> */}
    </div>
  );
}

export default App;
