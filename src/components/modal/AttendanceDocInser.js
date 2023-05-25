import SubjectUpdateModalCSS from "../../css/SubjectUpdateModal.module.css";
import AttendanceInsertModalCSS from "../../css/AttendanceInsertModal.module.css";
import DocumentsCSS from "../../css/Documents.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callLeaveRegist } from "../../apis/AttendanceAPICalls";
import { toast } from "react-hot-toast";

function AttendanceDocInsert({closeModal,employee}){

    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const {regist} = useSelector(state => state.AttendanceReducer);

    useEffect(
        ()=>{
            if(regist?.status === 200){
                toast.success("신청서가 등록되었습니다.");
                closeModal();
            }
        }
    )

    const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
    };


    const onClickHandler = () => {
        if(form.applyFormCode == null || undefined){
            toast.error("종류를 선택하세요");
            return;            
        }

        const formData = new FormData();

        formData.append("startDate", form.startDate);
        formData.append("endDate",form.endDate);
        formData.append("reason",form.reason);
        formData.append("applyForm.applyFormCode", form.applyFormCode);

        dispatch(callLeaveRegist(formData));
    }

    return(
        <div className={AttendanceInsertModalCSS.modal} onClick={(e)=> {closeModal()}}>
            <div className={AttendanceInsertModalCSS.modalContainer} onClick={(e)=> e.stopPropagation()}>
                <div className={AttendanceInsertModalCSS.name}>휴가신청서</div>
                <div className={AttendanceInsertModalCSS.AttendanceModalDiv}>
                    <label className={AttendanceInsertModalCSS.empName}>이름</label>
                    <input type="text" className={AttendanceInsertModalCSS.inputEmpName} value={employee.empName} readOnly/>
                    <label className={AttendanceInsertModalCSS.deptCode}>소속</label>
                    <input type="text" className={AttendanceInsertModalCSS.inputdeptName} value={employee.department.deptName} readOnly/>
                    <label className={AttendanceInsertModalCSS.leaveFormCode}>종류</label>
                    <select className={AttendanceInsertModalCSS.selectFormCode} onChange={onChangeHandler} name="applyFormCode">
                        <option value="1">종류 선택</option>
                        <option value="100001">휴가신청서</option>
                        <option value="100002">연차신청서</option>                        
                    </select>
                    <label className={AttendanceInsertModalCSS.atdStartTime}>신청기간 :</label>
                    <input type="Date" name="startDate" className={AttendanceInsertModalCSS.inputStartTime} onChange={onChangeHandler}/><p className={AttendanceInsertModalCSS.pp}>~</p>
                    <input type="Date" name="endDate" className={AttendanceInsertModalCSS.inputEndTime} onChange={onChangeHandler}/>
                    <label className={AttendanceInsertModalCSS.reason}>신청사유  :</label>
                    <textarea className={AttendanceInsertModalCSS.inputreason} onChange={onChangeHandler} name="reason"></textarea>
                
                <div className={AttendanceInsertModalCSS.last}>밍글대학교 총장</div>
                <img src="/images\최지원인 3.png" className={DocumentsCSS.image}/>
                <button onClick={onClickHandler} className={AttendanceInsertModalCSS.insertButton}>등록</button>
                </div>
            </div>            
        </div>
    )
}

export default AttendanceDocInsert;