import { useEffect, useState } from "react";
import SubjectUpdateModalCSS from "../../css/SubjectUpdateModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callSubjectInsertAPI } from "../../apis/LectureAPICalls";
import { toast } from "react-hot-toast";

function SubjectInsertModal({setIsInsertModalOpen}){

    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const {regist} = useSelector((state) =>state.SubjectReducer);
    console.log(regist);

    useEffect(
        ()=>{
            if(regist?.status === 200){
                console.log(regist);
                setIsInsertModalOpen(false);
                toast.success("과목 등록이 완료 되었습니다.");
            }
        },[regist]
    );

    const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const onClickInsertSubjectHandler = () => {

        if (form.classType === null || form.score === null || form.deptCode === null || form.sbjName === null ||
            form.classType === undefined || form.score === undefined || form.deptCode === undefined || form.sbjName === undefined) {
          toast.error("양식을 제대로 입력하세요");
          return;
        }
        const formData = new FormData();
        formData.append("classType", form.classType);
        formData.append("score", form.score);
        formData.append("department.deptCode", form.deptCode);
        formData.append("sbjName", form.sbjName);

        dispatch(callSubjectInsertAPI(formData));
    }

    return(
        <div className={SubjectUpdateModalCSS.modal}>
            <div className={SubjectUpdateModalCSS.modalContainer}>
                <div className={SubjectUpdateModalCSS.SubjectModalDiv}>
                    <label className={SubjectUpdateModalCSS.label}>이수구분</label>
                    <select className={SubjectUpdateModalCSS.classType} name="classType" onChange={onChangeHandler}>
                        <option value="전공필수">전공필수</option>
                        <option value="전공선택">전공선택</option>
                        <option value="교양필수">교양필수</option>
                        <option value="교양선택">교양선택</option>
                    </select>
                    <label className={SubjectUpdateModalCSS.label}>학점</label>
                    <input type="number" name="score" onChange={onChangeHandler}
                    className={SubjectUpdateModalCSS.score}/>
                    <label className={SubjectUpdateModalCSS.label}>학과명</label>
                    <select className={SubjectUpdateModalCSS.deptCode} name="deptCode" onChange={onChangeHandler}>
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
                    <input type="text" name="sbjName" onChange={onChangeHandler}
                    className={SubjectUpdateModalCSS.sbjName}/>
                    <button onClick={onClickInsertSubjectHandler}>등록</button>
                    <button onClick={()=> setIsInsertModalOpen(false)}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default SubjectInsertModal;