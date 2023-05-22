import { useSelector } from 'react-redux';
import SearchIDCSS from "../../css/SearchID.module.css"


function SearchPwdModal({ selected, closeModal }){

    const {search} = useSelector((state) => state.EmployeeReducer);

    return(
        <div className={SearchIDCSS.modal}>
        <div className={SearchIDCSS.modalContainer}>
        <h1><span id="title">M</span>ingle</h1>
            {selected && selected.empName ? (
                <div className={SearchIDCSS.ID}>{selected.empName}</div>
            ) : (
                <div>조회된 아이디가 없습니다.</div>
            )}


        <div className={SearchIDCSS.story}>
            <p> 
                본 정보는 개인정보 보호를 위해<br></br>
                확인 즉시 로그인 하는 것이 안전합니다.
            </p>
            <div>
            </div>
        </div>
            <button onClick={closeModal}>LOGIN</button>
        </div>
    </div>
    )
}







export default SearchPwdModal;