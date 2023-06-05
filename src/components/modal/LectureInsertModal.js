import { useEffect, useState } from "react";
import LectureInsertModalCSS from "../../css/LectureInsertModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callLectureInsertAPI, callSubjectInsertAPI, callSubjectListAPI } from "../../apis/LectureAPICalls";
import { toast } from "react-hot-toast";
import styles from '../../css/ReactDatePicker.module.css';
import { initRegist } from '../../modules/SubjectModule';


function LectureInsertModal({ setIsInsertModalOpen }) {
    const dispatch = useDispatch();
    const { subjectInfo } = useSelector(state => state.SubjectInfoReducer);
    const { regist } = useSelector(state => state.SubjectReducer);

    useEffect(
        () => {
            if (regist?.status === 200) {
                toast.success('강의등록이 완료되었습니다.');
                setIsInsertModalOpen(false);
                dispatch(initRegist());
            }
        },
        [subjectInfo, regist]
    )

    /*이벤트를 관리하는 상태값 관리  state*/
    const [form, setForm] = useState({});
    const [subject, setSubject] = useState({});
    const [classType, setClassType] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    /*개설학과에 따른 교수와 교과목불러오는 핸들러*/
    const onChangeHandler3 = (e) => {

        dispatch(callSubjectListAPI(e.target.value));

    };

    /*선택된 교과목에 따른 학점과 이수구분을 불러오는 핸들러 */
    const onChangeHandler2 = (e) => {
        console.log("과목명 => ", e.target.name);
        onChangeHandler(e);
        console.log('e.target.value', e.target.value)
        setSubject(subjectInfo.subjectNameList.find(subject => subject.sbjCode == e.target.value));

    };

    /*수업회차, 수업시작일, 수업종료일의 (input)입력 값 상태 저장 */
    /*각 입력정보를 form의 형태로 담는 핸들러 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    /*저장 핸들러  */
    const onClickInsertSubjectHandler = (form) => {

        console.log('formdata:', form)
        dispatch(callLectureInsertAPI(form));

    }

    const handleStartDateChange = (date) => {
        setStartDate(date);
        // 시작일 선택에 대한 추가 로직을 수행할 수 있습니다.
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        // 종료일 선택에 대한 추가 로직을 수행할 수 있습니다.
    };


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
                        <select className={LectureInsertModalCSS.classType} name="deptCode" onChange={onChangeHandler3}>

                            <option value="">선택해주세요</option>
                            <option value={13}>IT공학과</option>
                            <option value={14}>간호학과</option>
                            <option value={15}>경제학과</option>
                            <option value={16}>경영학과</option>
                            <option value={17}>환경공학과</option>
                            <option value={18}>외식조리학과</option>
                            <option value={19}>아동교육학과</option>
                            <option value={20}>시각디자인학과</option>

                        </select>
                        <label className={LectureInsertModalCSS.label}>교수명</label>
                        <select className={LectureInsertModalCSS.classType} name="empCode" onChange={onChangeHandler}>
                            {/*professorDTOList */}
                            <option value="">선택해주세요</option>
                            {subjectInfo && subjectInfo.professorDTOList &&
                                subjectInfo.professorDTOList.map((professor) => (
                                    <option value={professor.empCode}>{professor.empName}</option>
                                ))}

                        </select>
                    </div>
                    <div className={LectureInsertModalCSS.subjectName}>
                        <label className={LectureInsertModalCSS.label}>교과목명</label>
                        <select className={LectureInsertModalCSS.deptCode} name="sbjCode" onChange={onChangeHandler2} >
                            {/*subjectNameList */}
                            <option value="">선택해주세요.</option>
                            {subjectInfo && subjectInfo.subjectNameList && subjectInfo.subjectNameList.map((subjectname) => (
                                <option value={subjectname.sbjCode}>{subjectname.sbjName}</option>
                            ))}

                        </select>
                    </div>
                    <div className={LectureInsertModalCSS.subScore}>
                        <label className={LectureInsertModalCSS.label}>학점</label>
                        {/*특정 subjectcode일때 score를 가져온다.  */}
                        <input type="text" name="sbjscore" onChange={onChangeHandler} className={LectureInsertModalCSS.sbjName} readonly value={subject.score && subject.score}>

                        </input>
                        {/*특정 subjectcode일때 calssType를 가져온다.  */}
                        <label className={LectureInsertModalCSS.label}>이수구분</label>
                        <input type="text" name="sbjName" onChange={onChangeHandler} className={LectureInsertModalCSS.sbjName} readonly value={subject.classType && subject.classType} />
                    </div>
                    <div className={LectureInsertModalCSS.subScore2}>
                        <label className={LectureInsertModalCSS.label}>수업회차
                            <input type="text" name="lecCount" onChange={onChangeHandler}
                                className={LectureInsertModalCSS.sbjName} />
                        </label>
                        <label className={LectureInsertModalCSS.label}>수업 시작일
                            <input type='Date'
                                selected={startDate}
                                onChange={onChangeHandler}
                                dateFormat="yyyy-MM-dd"
                                name="lecStartDate"
                                wrapperClassName={styles.customButton} // 커스텀 CSS 클래스 이름을 여기에 사용합니다.
                            />
                        </label>

                        <label className={LectureInsertModalCSS.label}>수업 종료일
                            <input type='Date'
                                selected={endDate}
                                onChange={onChangeHandler}
                                dateFormat="yyyy-MM-dd"
                                name="lecEndDate"
                                wrapperClassName={styles.customButton} // 커스텀 CSS 클래스 이름을 여기에 사용합니다.


                            // 필요한 추가 옵션들을 설정할 수 있습니다.
                            />
                        </label>
                    </div>
                    <div className={LectureInsertModalCSS.buttons}>
                        <button onClick={() => onClickInsertSubjectHandler(form)}>등록</button>
                        <button onClick={() => setIsInsertModalOpen(false)}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LectureInsertModal;