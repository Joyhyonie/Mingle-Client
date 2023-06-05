import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeInsertModalCSS from "../../css/LecPlanModal.module.css"
import { callLecPlanInsertAPI } from "../../apis/LectureAPICalls";
import { toast } from "react-hot-toast";

function LecPlanModal({ lecture, closeModal }) {

  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const { employee } = useSelector((state => state.EmployeeReducer));
  const {lecplan} = useSelector(state => state.SubjectInfoReducer);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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
            toast.success("강의가 성공적으로 등록되었습니다 :)");               
        }
    },
    [lecplan]
)

  return (
    <div
         className={EmployeeInsertModalCSS.EmployeeInsertModal}>
      <div className={EmployeeInsertModalCSS.EmployeeInsertModalContainer}>
        <div className={EmployeeInsertModalCSS.EmployeeInsertModalInput}>
          <span className={EmployeeInsertModalCSS.EmployeeInsertModalTitle}>
            강의개설 ▸ 강의 계획서 작성
          </span>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalFirst}>
            <span className={EmployeeInsertModalCSS.EmployeeInsertModalYear}>년도</span>
            <input
              type="text"
              name="lecYear"
              className={EmployeeInsertModalCSS.EmployeeModalMain}
              value={lecture.lecYear}
            />
            <span>학기</span>
            <input
              type="text"
              name="lecSeason"
              className={EmployeeInsertModalCSS.EmployeeModalMain}
              value={lecture.lecSeason}
            />
            <div className={EmployeeInsertModalCSS.EmployeeModalButtonContainer}>
              { employee.empId.startsWith("PF") && <button className={EmployeeInsertModalCSS.EmployeeBtnFirst} onClick={onClickLecPlanInsertHandler}>등록</button>}
              {<button className={EmployeeInsertModalCSS.EmployeeBtnSecond} onClick={() => closeModal()}>취소</button>}
            </div>
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalSecond}>
            <span>교수명</span>
            <input
              type="text"
              name="empName"
              className={EmployeeInsertModalCSS.EmployeeInsertPfName}
              value={employee.empName}
            />
            <span>영문명</span>
            <input
              type="text"
              name="empName"
              className={EmployeeInsertModalCSS.EmployeeInsertPfNameEn}
              value={employee.empNameEn}
            />
            <span>학과</span>
            <input
              type="text"
              name="department"
              className={EmployeeInsertModalCSS.EmployeeInsertDeptName}
              value={employee.department.deptName}
            />
          </div>

          <div className={EmployeeInsertModalCSS.EmployeeInsertModalThird}>
            이메일
            <input
              type="text"
              name="empEmail"
              className={EmployeeInsertModalCSS.EmployeeInsertEmail}
              value={employee.empEmail}
            />
            H.P
            <input
              type="text"
              name="empPhone"
              className={EmployeeInsertModalCSS.EmployeeInsertPhone}
              value={employee.empPhone}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalMiddle}> 강의 정보</div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalFourth}>
            총 수업회차
            <input
              type="text"
              name="lecCount"
              className={EmployeeInsertModalCSS.EmployeeModalName}
              value={lecture.lecCount}
            />
            수업 시작일
            <input
              type="text"
              name="lecStartDate"
              className={EmployeeInsertModalCSS.EmployeeModalName}
              value={lecture.lecStartDate}
            />
            수업 종료일
            <input
              type="text"
              name="lecEndDate"
              className={EmployeeInsertModalCSS.EmployeeModalName}
              value={lecture.lecEndDate}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalFifth}>
            강의명
            <input
              type="text"
              name="lecName"
              className={EmployeeInsertModalCSS.EmployeeModalLecture}
              onChange={onChangeHandler}
              value={lecture.lecName}
            />
            과목명
            <input
              type="text"
              name="sbjName"
              className={EmployeeInsertModalCSS.EmployeeModalSubject}
              value={lecture.subject.sbjName}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalSixth}>
            <span>교과목 개요</span>
            <textarea
              name="lecSummary"
              className={EmployeeInsertModalCSS.EmployeeModalOutline}
              onChange={onChangeHandler}
              value={lecture.lecSummary}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalSeven}>
            강좌 목표
            <textarea
              name="lecGoal"
              onChange={onChangeHandler}
              value={lecture.lecGoal}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalEight}>
            <span className={EmployeeInsertModalCSS.EmployeeInsertModalBase}>평가 기준</span>
            <div className={EmployeeInsertModalCSS.EmployeeInsertGradeContainer}>
              <span>중간</span>
              <input
                type="text"
                name="lecPerMiddle"
                value={lecture.lecPerMiddle}
              />
              <span>기말</span>
              <input
                type="text"
                name="lecPerFinal"
                value={lecture.lecPerFinal}
              />
              <span>출석</span>
              <input
                type="text"
                name="lecPerAtd"
                value={lecture.lecPerAtd}
              />
              <span>과제</span>
              <input
                type="text"
                name="lecPerTask"
                value={lecture.lecPerTask}
              />
            </div>
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalNine}>
            <span>강의운영<br />방법</span>
            <textarea
              type="text"
              name="lecMethod"
              onChange={onChangeHandler}
              value={lecture.lecMethod}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalTen}>
            <p>교재 및<br/>참고자료</p>
            <table className={EmployeeInsertModalCSS.EmployeeInsertModalTable}>
              <thead>
                <tr className={EmployeeInsertModalCSS.EmployeeInsertModalTableTitle}>
                  <th className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}></th>
                  <th className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>도서명</th>                  
                </tr>
              </thead>
              <tbody>
                <tr className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>
                  <th className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>주교재</th>
                  <td className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>
                    <input
                      type="text"
                      name="lecBookMain"
                      onChange={onChangeHandler}
                      value={lecture.lecBookMain}></input>
                  </td>                  
                </tr>
                <tr>
                  <th className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>부교재</th>
                  <td className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>
                    <input
                      type="text"
                      name="lecBookSub"
                      onChange={onChangeHandler}
                      value={lecture.lecBookSub}></input>
                  </td>                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
    </div>

)}

export default LecPlanModal;