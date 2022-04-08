import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable';
import DataTableAxios from './components/DataTableAxios';

// const cors = require("cors");
// DataTable.use(cors());

function App() {
  return (
    <div className="App">
      <DataTable/>
      {/* <DataTableAxios/> */}
    </div>
  );
}

export default App;
