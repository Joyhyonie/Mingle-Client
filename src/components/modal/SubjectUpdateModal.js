import SubjectUpdateModalCSS from "../../css/SubjectUpdateModal.module.css";
import {callSubjectUpdateAPI} from "../../apis/LectureAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SubjectUpdateModal({subject,closeModal}){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(subject);
    const {modify} = useSelector(state => state.subjectReducer);

    const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

      const onClickSubjectUpdateHandler = () => {
        const formData = new FormData();
        formData.append("sbjCode", form.sbjCode);
        formData.append("classType", form.classType);
        formData.append("score", form.score);
        formData.append("department.deptCode", form.department.deptCode);
        formData.append("sbjName", form.sbjName);

        dispatch(callSubjectUpdateAPI(formData));
      };

      useEffect(
        ()=>{
            if(modify?.status === 200){
                closeModal(false);
                toast("과목 수정이 완료 되었습니다.");
            }
        },[modify]
    );
    

    return (
        <div className={SubjectUpdateModalCSS.modal}>
            <div className={SubjectUpdateModalCSS.modalContainer}>
                <div className={SubjectUpdateModalCSS.SubjectModalDiv}>
                    <label className={SubjectUpdateModalCSS.label}>이수구분</label>
                    <select className={SubjectUpdateModalCSS.classType} defaultValue={subject.classType} name="classType" onChange={onChangeHandler}>
                        <option value="전공필수">전공필수</option>
                        <option value="전공선택">전공선택</option>
                        <option value="교양필수">교양필수</option>
                        <option value="교양선택">교양선택</option>
                    </select>
                    <label className={SubjectUpdateModalCSS.label}>학점</label>
                    <input type="number" name="score" placeholder={subject.score} onChange={onChangeHandler}
                    className={SubjectUpdateModalCSS.score}/>
                    <label className={SubjectUpdateModalCSS.label}>학과명</label>
                    <input type="text" name="deptCode" placeholder={subject.department.deptName} onChange={onChangeHandler}
                    className={SubjectUpdateModalCSS.deptName}/>
                    <label className={SubjectUpdateModalCSS.label}>과목명</label>
                    <input type="text" name="sbjName" placeholder={subject.sbjName} onChange={onChangeHandler}
                    className={SubjectUpdateModalCSS.sbjName}/>
                    <button onClick={onClickSubjectUpdateHandler}>수정</button>
                    <button onClick={()=> closeModal(false)}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default SubjectUpdateModal;