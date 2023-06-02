import { useSelect } from "downshift";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeInsertModalCSS from "../../css/LecPlanModal.module.css"
import { callLecPlanInsertAPI } from "../../apis/LectureAPICalls";
import { callMyLectureCallAPI } from "../../apis/LectureAPICalls";


function LecPlanModal({ lecture, closeModal }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const { employee } = useSelector((state => state.EmployeeReducer));
  const { myLecture } = useSelector(state => state.SubjectInfoReducer);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(lecture);


  useEffect(() => {
    if (myLecture?.status === 200) {
      closeModal();
    }
  }, [myLecture]);

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
    formData.append("lecGoal", form.lecGoal);
    formData.append("lecMethod", form.lecMethod);
    formData.append("lecBookMain", form.lecBookMain);
    formData.append("lecBookSub", form.lecBookSub);

    dispatch(callLecPlanInsertAPI(formData));
  };
  useEffect(
    () => {
      dispatch(callMyLectureCallAPI(currentPage));
    },
    [currentPage]
  )


  return (
    <div className={EmployeeInsertModalCSS.EmployeeInsertModal}>

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
              onChange={onChangeHandler}
              value={lecture.lecYear}
            />
            <span>학기</span>
            <input
              type="text"
              name="lecSeason"
              className={EmployeeInsertModalCSS.EmployeeModalMain}
              onChange={onChangeHandler}
              value={lecture.lecSeason}
            />
            <div className={EmployeeInsertModalCSS.EmployeeModalButtonContainer}>
              <button className={EmployeeInsertModalCSS.EmployeeBtnFirst} onClick={onClickLecPlanInsertHandler}>등록</button>
              <button className={EmployeeInsertModalCSS.EmployeeBtnSecond} onClick={() => closeModal()}>취소</button>
            </div>
          </div>


          <div className={EmployeeInsertModalCSS.EmployeeInsertModalSecond}>
            <span>교수명</span>
            <input
              type="text"
              name="empName"
              className={EmployeeInsertModalCSS.EmployeeInsertPfName}
              onChange={onChangeHandler}
              value={employee.empName}
            />
            <span>영문명</span>
            <input
              type="text"
              name="empName"
              className={EmployeeInsertModalCSS.EmployeeInsertPfNameEn}
              onChange={onChangeHandler}
              value={employee.empNameEn}
            />
            <span>학과</span>
            <input
              type="text"
              name="department"
              className={EmployeeInsertModalCSS.EmployeeInsertDeptName}
              onChange={onChangeHandler}
              value={employee.department.deptName}
            />
          </div>

          <div className={EmployeeInsertModalCSS.EmployeeInsertModalThird}>
            이메일
            <input
              type="text"
              name="empEmail"
              className={EmployeeInsertModalCSS.EmployeeInsertEmail}
              onChange={onChangeHandler}
              value={employee.empEmail}
            />
            H.P
            <input
              type="text"
              name="empPhone"
              className={EmployeeInsertModalCSS.EmployeeInsertPhone}
              onChange={onChangeHandler}
              value={employee.empPhone}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalMiddle}>> 강의 정보</div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalFourth}>
            총 수업회차
            <input
              type="text"
              name="lecCount"
              className={EmployeeInsertModalCSS.EmployeeModalName}
              onChange={onChangeHandler}
              value={lecture.lecCount}
            />
            수업 시작일
            <input
              type="text"
              name="lecSeason"
              className={EmployeeInsertModalCSS.EmployeeModalName}
              onChange={onChangeHandler}
              value={lecture.lecStartDate}
            />
            수업 종료일
            <input
              type="text"
              name="lecSeason"
              className={EmployeeInsertModalCSS.EmployeeModalName}
              onChange={onChangeHandler}
              value={lecture.lecEndDate}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalFifth}>
            강의명
            <input
              type="text"
              name=""
              className={EmployeeInsertModalCSS.EmployeeModalLecture}
              onChange={onChangeHandler}
              value={lecture.lecName}
            />
            과목명
            <input
              type="text"
              name=""
              className={EmployeeInsertModalCSS.EmployeeModalSubject}
              onChange={onChangeHandler}
              value={lecture.subject.sbjName}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalSixth}>
            <span>교과목 개요</span>
            <textarea
              name=""
              className={EmployeeInsertModalCSS.EmployeeModalOutline}
              onChange={onChangeHandler}
              value={lecture.lecGoal}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalSeven}>
            강좌 목표
            <textarea
              name=""
              onChange={onChangeHandler}
              value={lecture.lecMethod}
            />
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalEight}>
            <span className={EmployeeInsertModalCSS.EmployeeInsertModalBase}>평가 기준</span>
            <div className={EmployeeInsertModalCSS.EmployeeInsertGradeContainer}>
              <span>중간</span>
              <input
                type="text"
                name=""
                onChange={onChangeHandler}
                value={lecture.lecPerMiddle}
              />
              <span>기말</span>
              <input
                type="text"
                name=""
                onChange={onChangeHandler}
                value={lecture.lecPerFinal}
              />
              <span>출석</span>
              <input
                type="text"
                name=""
                onChange={onChangeHandler}
                value={lecture.lecPerAtd}
              />
              <span>과제</span>
              <input
                type="text"
                name=""
                onChange={onChangeHandler}
                value={lecture.lecPerTask}
              />
            </div>
          </div>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalNine}>
            <span>강의운영<br />방법</span>
            <textarea
              type="text"
              name=""
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
                  <th className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>저자</th>
                  <th className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>출판사</th>
                </tr>
              </thead>
              <tbody>
                <tr className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>
                  <th className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>주교재</th>
                  <td className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>
                    <input
                      type="text"
                      name=""
                      onChange={onChangeHandler}
                      value={lecture.lecBookMain}></input>
                  </td>
                  <td className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>
                    <input
                      type="text"
                      name=""
                      onChange={onChangeHandler}
                      value={lecture.lecBookMain}></input>
                  </td>
                  <td className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>
                    <input
                      type="text"
                      name=""
                      onChange={onChangeHandler}
                      value={lecture.lecBookMain}></input>
                  </td>
                </tr>
                <tr>
                  <th className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>부교재</th>
                  <td className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>
                    <input
                      type="text"
                      name=""
                      onChange={onChangeHandler}
                      value={lecture.lecBookSub}></input>
                  </td>
                  <td className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>
                    <input
                      type="text"
                      name=""
                      onChange={onChangeHandler}
                      value={lecture.lecBookSub}></input>
                  </td>
                  <td className={EmployeeInsertModalCSS.EmployeeInsertModalTableTr}>
                    <input
                      type="text"
                      name=""
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
  );
}

export default LecPlanModal;