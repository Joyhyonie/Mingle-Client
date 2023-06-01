import { useSelect } from "downshift";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeInsertModal from "../../css/EmployeeInsertModal.module.css";

function LecPlanModal({lecture}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const {employee} = useSelector((state => state.EmployeeReducer));
  
    
    useEffect( () => {
        if(lecture?.status === 200) {
            setIsLecPlanModalOpen(false);
        }
    },[lecdata]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });

    };

    const onClickLecPlanInsertHandler = () => {

        const formData = new FormData();
        formData.append("lecSummary", form.lecSummary);
        formData.append("lecGoal",form.lecGoal);
        formData.append("lecMethod",form.lecMethod);
        formData.append("lecBookMain",form.lecBookMain);
        formData.append("lecBookSub",form.lecBookSub);

        dispatch(callLecPlanInsertAPI(formData));
    };


    return(
        <div className={EmployeeInsertModalCSS.EmployeeModal}>
            <div className={EmployeeInsertModalCSS.EmployeeInsertModalContainer}>
                <div className={EmployeeInsertModalCSS.EmployeeInsertModalBtn}>
                        <button className={EmployeeInsertModalCSS.EmployeeBtnFirst} onClick={onClickEmployeeInsertHandler}>등록</button>
                        <button className={EmployeeInsertModalCSS.EmployeeBtnSecond} onClick={() => setIsEmployeeInsertModalOpen(false)}>취소</button>
                </div>

                <div className={EmployeeInsertModalCSS.EMployeeInsertInput}>
                    <div className={EmployeeInsertModalCSS.EmployeeInsertModalFirst}>
                        <input
                            type="text"
                            name="lecYear"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                        />
                         <input
                            type="text"
                            name="lecSeason"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                        />

                    </div>
                    <div>
                        교수명
                        <input
                        type="text"
                        name="empName"
                        />
                         <input
                        type="text"
                        name="empName"
                        />
                        학과
                        <input
                        type="text"
                        name="department"
                        />
                    </div>

                    <div>
                        이메일
                        <input 
                        type="text"
                        name="empEmail"
                        />
                        H.P
                        <input 
                        type="text"
                        name="empPhone"
                        />
                    </div>
                    <div>강의 정보</div>
                    <div className={EmployeeInsertModalCSS.EmployeeInsertModalFirst}>
                        총수업회차
                        <input
                            type="text"
                            name="lecYear"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                        />
                        수업시작일
                         <input
                            type="text"
                            name="lecSeason"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                        />
                          수업종료일
                            <input
                            type="text"
                            name="lecSeason"
                            className={EmployeeInsertModalCSS.EmployeeModalName}
                        />

                    </div>


                </div>



            </div>


        </div>
    )

}

export default LecPlanModal;