import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './layouts/Layout';
import Main from './pages/main/Main';
import Mypage from "./pages/employee/Mypage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>
          <Route path="/mypage" element={ <Mypage/> }/>
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
