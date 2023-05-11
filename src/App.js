import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './layouts/Layout';
import Main from './pages/main/Main';
import Mypage from "./pages/employee/Mypage";
import Board from "./pages/board/Board";
import Organization from "./pages/employee/Organization";
import AppliedCertidocs from "./pages/certiDoc/AppliedCertidocs";
import ApplyCertiDoc from "./pages/certiDoc/ApplyCertiDoc";
import MyCertiDoc from "./pages/certiDoc/MyCertiDoc";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>
          <Route path="mypage" element={ <Mypage/> }/>
          <Route path="board" element={ <Board/> }/>
          <Route path="organization" element={ <Organization/> }/>
          <Route path="certi-doc-applied" element={ <AppliedCertidocs/> }/>
          <Route path="certi-doc-apply" element={ <ApplyCertiDoc/> }/>
          <Route path="certi-doc-mine" element={ <MyCertiDoc/> }/>

          
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
