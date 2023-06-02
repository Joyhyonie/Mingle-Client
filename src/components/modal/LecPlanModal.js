import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeInsertModalCSS from "../../css/LecPlanModal.module.css"
import { callLecPlanInsertAPI } from "../../apis/LectureAPICalls";
import { toast } from "react-hot-toast";


function LecPlanModal({ lecture,closeModal}) {

    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const {employee} = useSelector(state => state.EmployeeReducer);
    const {lecplan} = useSelector(state => state.SubjectInfoReducer);
    
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
            if(lecplan?.status === 200){
                closeModal();
                toast.success("강의등록성공");               
            }
        },
        [lecplan]
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
                            value={lecture.lecYear}
                        />
                         <input
                            type="text"
                            name="lecSeason"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                            value={lecture.lecSeason}
                        />                   
                    </div>
                                
                    <div className={EmployeeInsertModalCSS.EmployeeInsertModalSecond}>
                        교수명
                        <input
                        type="text"
                        name="empName"
                        value={ employee.empName }
                        />
                         <input
                        type="text"
                        name="empName"
                        value={ employee.empNameEn }
                        />
                        학과
                        <input
                        type="text"
                        name="department"
                        value={ employee.department.deptName }
                        />
                    </div>

                    <div>
                        이메일
                        <input 
                        type="text"
                        name="empEmail"
                        value={ employee.empEmail }
                        />
                        H.P
                        <input 
                        type="text"
                        name="empPhone"
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
                            value={ lecture.lecCount }
                        />
                        수업시작일
                         <input
                            type="text"
                            name="lecStartDate"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                            value={ lecture.lecStartDate }
                        />
                          수업종료일
                            <input
                            type="text"
                            name="lecEndDate"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                            value={ lecture.lecEndDate }
                        />
                    </div>
                    <div>
                        강의명
                        <input 
                        type="text"
                        name="lecName"
                        onChange={onChangeHandler}
                        value={ lecture.lecName }
                        />
                        과목명
                        <input 
                        type="text"
                        name="sbjName"
                        value={ lecture.subject.sbjName }
                        />
                    </div>
                    <div>
                        교과목개요
                        <input 
                        type="text"
                        name="lecSummary"
                        onChange={onChangeHandler}
                        value={ lecture.lecSummary }
                        />
                    </div>
                    <div>
                        강좌 목표
                        <input 
                        type="text"
                        name="lecGoal"
                        onChange={onChangeHandler}
                        value={ lecture.lecGoal }
                        />
                    </div>
                    <div>
                        중간 
                        <input 
                        type="text"
                        name="lecPerMiddle"
                        value={ lecture.lecPerMiddle }
                        />
                        기말
                        <input 
                        type="text"
                        name="lecPerFinal"
                        value={ lecture.lecPerFinal }
                        />
                        출석
                        <input 
                        type="text"
                        name="lecPerAtd"
                        value={ lecture.lecPerAtd }
                        />
                        과제
                        <input 
                        type="text"
                        name="lecPerTask"
                        value={ lecture.lecPerTask }
                        />
                    </div>
                    <div>
                        강의운영방법
                        <input 
                        type="text"
                        name="lecMethod"
                        onChange={onChangeHandler}
                        value={ lecture.lecMethod }
                        />
                    </div>
                    <div>
                        교재 및 참고자료 
                        <div>
                            주교재
                            <input 
                            type="text"
                            name="lecBookMain"
                            onChange={onChangeHandler}
                           value={ lecture.lecBookMain }
                            />
                            부교재
                            <input 
                            type="text"
                            name="lecBookSub"
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