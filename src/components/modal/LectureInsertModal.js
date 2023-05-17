import { useEffect, useState } from "react";
import LectureInsertModalCSS from "../../css/LectureInsertModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callSubjectInsertAPI } from "../../apis/LectureAPICalls";
import { toast } from "react-hot-toast";

function LectureInsertModal({setIsInsertModalOpen}){

    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const {regist} = useSelector((state) =>state.subjectReducer);

    useEffect(
        ()=>{
            if(regist?.status === 200){
                setIsInsertModalOpen(false);
                toast("과목 수정이 완료 되었습니다.");
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

        const formData = new FormData();
        formData.append("classType", form.classType);
        formData.append("score", form.score);
        formData.append("department.deptCode", form.deptCode);
        formData.append("sbjName", form.sbjName);

        dispatch(callSubjectInsertAPI(formData));
    }

    return(
        <div className={LectureInsertModalCSS.modal}>
            <div className={LectureInsertModalCSS.modalContainer}>
                <div className={LectureInsertModalCSS.SubjectModalDiv}>
                    <div className={LectureInsertModalCSS.inputbar}>
                    <input type="text" name="sbjName" onChange={onChangeHandler}
                    /><label className={LectureInsertModalCSS.label}>학년도</label>

                     <input type="text" name="sbjName" onChange={onChangeHandler}
                    /><label className={LectureInsertModalCSS.label}>학기</label>
                    </div>
                    <div className={LectureInsertModalCSS.professor}>
                    <label className={LectureInsertModalCSS.label}>교수명</label>
                    <select className={LectureInsertModalCSS.classType} name="classType" onChange={onChangeHandler}>
                        {/*가짜 옵션 */}  
                        <option value="전공필수">전공필수</option>
                        <option value="전공선택">전공선택</option>
                        <option value="교양필수">교양필수</option>
                        <option value="교양선택">교양선택</option>
                    </select>
                    <label className={LectureInsertModalCSS.label}>개설학과</label>
                    <select className={LectureInsertModalCSS.classType} name="classType"  onChange={onChangeHandler}>
                    {/*가짜 옵션 */}  
                    <option value="전공필수">전공필수</option>
                        <option value="전공선택">전공선택</option>
                        <option value="교양필수">교양필수</option>
                        <option value="교양선택">교양선택</option>
                    </select>
                    </div>
                    <div className={LectureInsertModalCSS.subjectName}>
                    <label className={LectureInsertModalCSS.label}>교과목명</label>
                    <select className={LectureInsertModalCSS.deptCode} name="deptCode" onChange={onChangeHandler}>
                         {/*가짜 옵션 */}  
                        <option value="13">거시경제학</option>
                        <option value="14">간호학과</option>
                        <option value="15">경제학과</option>
                        <option value="16">경영학과</option>
                        <option value="17">환경공학과</option>
                        <option value="18">외식조리학과</option>
                        <option value="19">아동교육학과</option>
                        <option value="20">시각디자인학과</option>
                    </select>
                    </div>
                    <div className={LectureInsertModalCSS.subScore}> 
                    <label className={LectureInsertModalCSS.label}>학점</label>
                    <input type="text" name="sbjName" onChange={onChangeHandler}
                    className={LectureInsertModalCSS.sbjName}/>
                     <label className={LectureInsertModalCSS.label}>이수구분</label>
                    <input type="text" name="sbjName" onChange={onChangeHandler}
                    className={LectureInsertModalCSS.sbjName}/>
                    </div>
                    <div className={LectureInsertModalCSS.subScore2}> 
                    <label className={LectureInsertModalCSS.label}>수업회차</label>
                    <input type="text" name="sbjName" onChange={onChangeHandler}
                    className={LectureInsertModalCSS.sbjName}/>
                     <label className={LectureInsertModalCSS.label}>수업시작일</label>
                    <input type="text" name="sbjName" onChange={onChangeHandler}
                    className={LectureInsertModalCSS.sbjName}/>
                     <label className={LectureInsertModalCSS.label}>수업종료일</label>
                    <input type="text" name="sbjName" onChange={onChangeHandler}
                    className={LectureInsertModalCSS.sbjName}/>
                    </div>
                    <div className={LectureInsertModalCSS.buttons}>
                    <button onClick={onClickInsertSubjectHandler}>등록</button>
                    <button onClick={()=> setIsInsertModalOpen(false)}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LectureInsertModal;