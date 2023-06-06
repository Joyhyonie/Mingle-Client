import SubjectUpdateModalCSS from "../../css/SubjectUpdateModal.module.css";
import {callSubjectUpdateAPI} from "../../apis/LectureAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function SubjectUpdateModal({subject,closeModal}){

    const dispatch = useDispatch();

    const [form, setForm] = useState(subject);
    const {modify} = useSelector(state => state.SubjectReducer);
    console.log(subject);

    const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

      const onClickSubjectUpdateHandler = () => {

        if(form.deptCode == null) {
            toast.error("학과를 선택해주세요")
        }
        const formData = new FormData();
        formData.append("sbjCode", form.sbjCode);
        formData.append("classType", form.classType);
        formData.append("score", form.score);
        formData.append("department.deptCode", form.deptCode);
        formData.append("sbjName", form.sbjName);

        dispatch(callSubjectUpdateAPI(formData));
      };

      useEffect(
        ()=>{
            if(modify?.status === 200){
                closeModal();
                toast.success("과목 수정이 완료 되었습니다 :)");
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
                    <select className={SubjectUpdateModalCSS.deptCode} name="deptCode" onChange={onChangeHandler}>
                        <option defaultValue="">학과를 선택해주세요</option>
                        <option value="13">IT공학과</option>
                        <option value="14">간호학과</option>
                        <option value="15">경제학과</option>
                        <option value="16">경영학과</option>
                        <option value="17">환경공학과</option>
                        <option value="18">외식조리학과</option>
                        <option value="19">아동교육학과</option>
                        <option value="20">시각디자인학과</option>
                    </select>
                    <label className={SubjectUpdateModalCSS.label}>과목명</label>
                    <input type="text" name="sbjName" placeholder={subject.sbjName} onChange={onChangeHandler}
                    className={SubjectUpdateModalCSS.sbjName}/>
                    <button onClick={onClickSubjectUpdateHandler}>수정</button>
                    <button onClick={()=> closeModal()}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default SubjectUpdateModal;