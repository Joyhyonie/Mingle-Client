/* 강의경력증명서 양식 */
/* 경력증명서 양식 */
import { useEffect } from "react";
import DocumentsCSS from "../../css/Documents.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callDetailCertiDoc } from "../../apis/CertiDocAPICalls";

function LectureExperienceCerti({closeModal,myCerti}){

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
        <div className={DocumentsCSS.modal} onClick={(e)=> {closeModal()}}>
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
                        <th className={DocumentsCSS.thLecture} colSpan="8">강의 경력 사항</th>                        
                    </tr>
                    <tr>
                        <th className={DocumentsCSS.thLectureETC} colSpan="1">강의기간</th>
                        <th className={DocumentsCSS.thLectureETC} colSpan="2">담당과목</th>
                        <th className={DocumentsCSS.thLectureETC} colSpan="1">강의시간</th>
                    </tr>    
                    <tr>
                    <th colSpan="1">ㅎㅇ</th>
                    <th colSpan="2">ㅎㅇ</th>
                    <th colSpan="1">ㅎㅇ</th>
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

export default LectureExperienceCerti;