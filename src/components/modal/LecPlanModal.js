import { useSelect } from "downshift";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeInsertModalCSS from "../../css/LecPlanModal.module.css"
import { callLecPlanInsertAPI } from "../../apis/LectureAPICalls";
import { callMyLectureCallAPI } from "../../apis/LectureAPICalls";


function LecPlanModal({ lecture,closeModal}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const {employee} = useSelector((state => state.EmployeeReducer));
    const {myLecture} = useSelector(state => state.SubjectInfoReducer);
    const [currentPage, setCurrentPage] = useState(1);
  
    console.log(lecture);
    

    useEffect( () => {
        if(myLecture?.status === 200) {
            closeModal();
        }
    },[myLecture]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });

    };

    const onClickLecPlanInsertHandler = () => {

        const formData = new FormData();
        formData.append("lecName", form.lecName);
        formData.append("lecSummary", form.lecSummary);
        formData.append("lecGoal",form.lecGoal);
        formData.append("lecMethod",form.lecMethod);
        formData.append("lecBookMain",form.lecBookMain);
        formData.append("lecBookSub",form.lecBookSub);

        dispatch(callLecPlanInsertAPI(formData, lecture.lecCode));
    };
    useEffect(
        ()=>{
          dispatch(callMyLectureCallAPI(currentPage));
        },
        [currentPage]
      )
      
    
    return(
        <div className={EmployeeInsertModalCSS.EmployeeInsertModal}>
            
            <div className={EmployeeInsertModalCSS.EmployeeInsertModalContainer}>          
                <div className={EmployeeInsertModalCSS.EmployeeInsertModalInput}>
                <span>
                강의개설 ▸ 강의 계획서 작성
                </span>
                    <div className={EmployeeInsertModalCSS.EmployeeInsertModalFirst}>          
                        <input
                            type="text"
                            name="lecYear"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                            onChange={onChangeHandler}
                            value={lecture.lecYear}
                        />
                         <input
                            type="text"
                            name="lecSeason"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                            onChange={onChangeHandler}
                            value={lecture.lecSeason}
                        />               
                    </div>
                  
                
                    <div className={EmployeeInsertModalCSS.EmployeeInsertModalSecond}>
                        교수명
                        <input
                        type="text"
                        name="empName"
                        onChange={onChangeHandler}
                        value={ employee.empName }
                        />
                         <input
                        type="text"
                        name="empName"
                        onChange={onChangeHandler}
                        value={ employee.empNameEn }
                        />
                        학과
                        <input
                        type="text"
                        name="department"
                        onChange={onChangeHandler}
                        value={ employee.department.deptName }
                        />
                    </div>

                    <div>
                        이메일
                        <input 
                        type="text"
                        name="empEmail"
                        onChange={onChangeHandler}
                        value={ employee.empEmail }
                        />
                        H.P
                        <input 
                        type="text"
                        name="empPhone"
                        onChange={onChangeHandler}
                        value={ employee.empPhone }
                        />
                    </div>
                    <div>강의 정보</div>
                    <div className={EmployeeInsertModalCSS.EmployeeInsertModalFirst}>
                        총수업회차
                        <input
                            type="text"
                            name="lecCount"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                            onChange={onChangeHandler}
                            value={ lecture.lecCount }
                        />
                        수업시작일
                         <input
                            type="text"
                            name="lecSeason"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                            onChange={onChangeHandler}
                            value={ lecture.lecStartDate }
                        />
                          수업종료일
                            <input
                            type="text"
                            name="lecSeason"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                            onChange={onChangeHandler}
                            value={ lecture.lecEndDate }
                        />
                    </div>
                    <div>
                        강의명
                        <input 
                        type="text"
                        name=""
                        onChange={onChangeHandler}
                        value={ lecture.lecName }
                        />
                        과목명
                        <input 
                        type="text"
                        name=""
                        onChange={onChangeHandler}
                        value={ lecture.subject.sbjName }
                        />
                    </div>
                    <div>
                        교과목개요
                        <input 
                        type="text"
                        name=""
                        onChange={onChangeHandler}
                        value={ lecture.lecGoal }
                        />
                    </div>
                    <div>
                        강좌 목표
                        <input 
                        type="text"
                        name=""
                        onChange={onChangeHandler}
                        value={ lecture.lecMethod }
                        />
                    </div>
                    <div>
                        중간 
                        <input 
                        type="text"
                        name=""
                        onChange={onChangeHandler}
                        value={ lecture.lecPerMiddle }
                        />
                        기말
                        <input 
                        type="text"
                        name=""
                        onChange={onChangeHandler}
                        value={ lecture.lecPerFinal }
                        />
                        출석
                        <input 
                        type="text"
                        name=""
                        onChange={onChangeHandler}
                        value={ lecture.lecPerAtd }
                        />
                        과제
                        <input 
                        type="text"
                        name=""
                        onChange={onChangeHandler}
                        value={ lecture.lecPerTask }
                        />
                    </div>
                    <div>
                        강의운영방법
                        <input 
                        type="text"
                        name=""
                        onChange={onChangeHandler}
                        value={ lecture.lecPerTask }
                        />
                    </div>
                    <div>
                        교재 및 참고자료 
                        <div>
                            주교재
                            <input 
                            type="text"
                            name=""
                            onChange={onChangeHandler}
                           value={ lecture.lecBookMain }
                            />
                            부교재
                            <input 
                            type="text"
                            name=""
                            onChange={onChangeHandler}
                             value={ lecture.lecBookSub }
                            />
                        </div>
                    </div>
                    <button className={EmployeeInsertModalCSS.EmployeeBtnFirst} onClick={onClickLecPlanInsertHandler}>등록</button>
                        <button className={EmployeeInsertModalCSS.EmployeeBtnSecond} onClick={() => closeModal()}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default LecPlanModal;