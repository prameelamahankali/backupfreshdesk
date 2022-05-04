import {Button} from '@mui/material';
import { useNavigate } from "react-router-dom";


function NoTicketFoundPage() {
  let navigate = useNavigate();
  const Home = () => {
    let path = `/`;
    navigate(path);
  }
  return (
    <div className="App">
        <h1>TICKET NOT FOUND</h1>

        <Button onClick={Home}>Go To Home Page</Button>

    </div>
  );
}

export default NoTicketFoundPage;
