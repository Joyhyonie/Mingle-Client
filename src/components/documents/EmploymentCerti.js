/* 재직증명서 양식 */
import { useEffect } from "react";
import DocumentsCSS from "../../css/Documents.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callDetailCertiDoc } from "../../apis/CertiDocAPICalls";

function EmploymentCerti({closeModal,myCerti}){

    const dispatch = useDispatch();
    const {certi} = useSelector(state => state.CertiReducer);
    const code = certi.certiDocCode;

    useEffect(
        ()=>{
            dispatch(callDetailCertiDoc(myCerti));
        },
        [code]
    )

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
      }

    return (    
        <>
        <div className={DocumentsCSS.modal} onClick={()=> closeModal()}>
            {certi.certiDocCode && (
                <>
            <div className={DocumentsCSS.modalContainer} onClick={(e)=> e.stopPropagation()}>
            <div className={DocumentsCSS.docCode}>제 {certi.certiDocCode}</div>
            <div className={DocumentsCSS.deptName}>{certi.certiForm.certiFormName}</div>
                <table className={DocumentsCSS.CareerCertiModalDiv} onClick={()=> window.print()}>
                    <tbody>
                    <tr>
                        <th className={DocumentsCSS.th}>이름</th>
                        <td className={DocumentsCSS.name}>{certi.applyer.empName}</td>                    
                        <th className={DocumentsCSS.th}>소속</th>
                        <td className={DocumentsCSS.name} colSpan="2">{certi.applyer.department.deptName}</td>
                    </tr>
                    <tr>
                        <th className={DocumentsCSS.th}>주민등록번호</th>
                        <td className={DocumentsCSS.ssn} colSpan="4">{certi.applyer.empSsn}</td>
                    </tr>
                    <tr>
                        <th className={DocumentsCSS.th}>발급용도</th>
                        <td colSpan="4">{certi.certiUse}</td>
                    </tr>
                    <tr>
                        <th className={DocumentsCSS.th}>재직기간</th>
                        <td colSpan="4">{certi.applyer.empEntDate.split("T")[0]} 부터 {new Date().toISOString().split("T")[0]} 까지</td>
                    </tr>
                    <tr>
                        <th colSpan="8" className={DocumentsCSS.content}>위와 같이 재직하고 있음을 증명합니다.</th>
                        <img src="/images\최지원인 3.png" className={DocumentsCSS.image}/>
                    </tr>
                    </tbody>
                    <h4 className={DocumentsCSS.date}> {formatDate(new Date())}</h4>
                    <p className={DocumentsCSS.in}>(인)</p>
                </table>
            </div>
            </>
)}
        </div>
        </>
    )
}

export default EmploymentCerti;