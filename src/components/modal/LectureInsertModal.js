import { useEffect, useState } from "react";
import LectureInsertModalCSS from "../../css/LectureInsertModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callSubjectListAPI } from "../../apis/LectureAPICalls";
import { toast } from "react-hot-toast";

function LectureInsertModal({ setIsInsertModalOpen }) {
    const dispatch = useDispatch();
    const subjectInfo = useSelector(state => state.SubjectInfoReducer);




    /*이벤트를 관리하는 상태값 관리  state*/
    const [form, setForm] = useState({

        deptCode: 13,


    });
    const [score, setScore] = useState({});

    const [classType, setClassType] = useState('');





    /*수업회차, 수업시작일, 수업종료일의 (input)입력 값 상태 저장 */





    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };
    const onChangeHandler2 = (e) => {
        console.log('e.target.value', e.target.value)
        setScore(subjectInfo.subjectNameList.find(subject => subject.sbjCode == e.target.value));


        console.log('subjectInfo.subjectNameList', subjectInfo.subjectNameList);
        console.log('subjectInfo.subject.sbjCode', subjectInfo.subjectNameList.sbjCode);





    };




    const { deptCode } = form;
    console.log('subjectInfo', subjectInfo);
    console.log('form', form);
    console.log('score', score);




    useEffect(
        () => {
            dispatch(callSubjectListAPI({ deptCode }));
        },
        [deptCode]
    )






    /*저장 핸들러  */
    const onClickInsertSubjectHandler = () => {

        const formData = new FormData();
        formData.append("classType", form.classType);
        formData.append("score", form.score);
        formData.append("department.deptCode", form.deptCode);
        formData.append("sbjName", form.sbjName);

        console.log('formdata:', formData)
        /*dispatch(callSubjectListAPI(formData));*/
    }



    return (


        <div className={LectureInsertModalCSS.modal}>
            <div className={LectureInsertModalCSS.modalContainer}>
                <div className={LectureInsertModalCSS.SubjectModalDiv}>
                    <div className={LectureInsertModalCSS.inputbar}>
                        <input type="text" name="lecYear" onChange={onChangeHandler}
                        /><label className={LectureInsertModalCSS.label}>학년도</label>

                        <input type="text" name="lecSeason" onChange={onChangeHandler}
                        /><label className={LectureInsertModalCSS.label}>학기</label>
                    </div>
                    <div className={LectureInsertModalCSS.professor}>

                        <label className={LectureInsertModalCSS.label}>개설학과</label>
                        <select className={LectureInsertModalCSS.classType} name="deptCode" onChange={onChangeHandler}>
                            {/*가짜 옵션 */}
                            <option value="13">IT공학과</option>
                            <option value="14">간호학과</option>
                            <option value="15">경제학과</option>
                            <option value="16">경영학과</option>
                            <option value="17">환경공학과</option>
                            <option value="18">외식조리학과</option>
                            <option value="19">아동교육학과</option>
                            <option value="20">시각디자인학과</option>

                        </select>
                        <label className={LectureInsertModalCSS.label}>교수명</label>
                        <select className={LectureInsertModalCSS.classType} name="empCode" onChange={onChangeHandler}>
                            {/*professorDTOList */}
                            {subjectInfo && subjectInfo.professorDTOList &&
                                subjectInfo.professorDTOList.map((professor) => (
                                    <option value={professor.empCode}>{professor.empName}</option>
                                ))}

                        </select>
                    </div>
                    <div className={LectureInsertModalCSS.subjectName}>
                        <label className={LectureInsertModalCSS.label}>교과목명</label>
                        <select className={LectureInsertModalCSS.deptCode} name="sbjCode" onChange={onChangeHandler2}>
                            {/*subjectNameList */}
                            {subjectInfo && subjectInfo.subjectNameList && subjectInfo.subjectNameList.map((subjectname) => (
                                <option value={subjectname.sbjCode}>{subjectname.sbjName}</option>
                            ))}

                        </select>
                    </div>
                    <div className={LectureInsertModalCSS.subScore}>
                        <label className={LectureInsertModalCSS.label}>학점</label>
                        {/*특정 subjectcode일때 score를 가져온다.  */}
                        <input type="text" name="sbjName" onChange={onChangeHandler} className={LectureInsertModalCSS.sbjName} readonly value={score.score && score.score}>

                        </input>
                        {/*특정 subjectcode일때 calssType를 가져온다.  */}
                        <label className={LectureInsertModalCSS.label}>이수구분</label>
                        <input type="text" name="sbjName" onChange={onChangeHandler} className={LectureInsertModalCSS.sbjName} readonly value={score.classType && score.classType} />
                    </div>
                    <div className={LectureInsertModalCSS.subScore2}>
                        <label className={LectureInsertModalCSS.label}>수업회차</label>
                        <input type="text" name="lecCount" onChange={onChangeHandler}
                            className={LectureInsertModalCSS.sbjName} />
                        <label className={LectureInsertModalCSS.label}>수업시작일</label>
                        <input type="text" name="lecStartDate" onChange={onChangeHandler}
                            className={LectureInsertModalCSS.sbjName} />
                        <label className={LectureInsertModalCSS.label}>수업종료일</label>
                        <input type="text" name="lecEndDate" onChange={onChangeHandler}
                            className={LectureInsertModalCSS.sbjName} />
                    </div>
                    <div className={LectureInsertModalCSS.buttons}>
                        <button onClick={onClickInsertSubjectHandler}>등록</button>
                        <button onClick={() => setIsInsertModalOpen(false)}>취소</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LectureInsertModal;