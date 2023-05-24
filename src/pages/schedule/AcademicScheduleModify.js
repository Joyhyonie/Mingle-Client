/* 행정 직원의 학사 일정 관리 */
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { callAcScheduleListAPI, callAcScheduleByDateAPI, callAcScheduleModifyAPI } from '../../apis/ScheduleAPICalls';
import { toast } from "react-hot-toast";
import AcademicScheduleCss from "../../css/AcademicSchedule.module.css";
import CommonCSS from '../../css/common/Common.module.css';


function AcademicSchedule() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allAcSchedule, acSchedule } = useSelector((state) => state.ScheduleReducer);
  const { employee } = useSelector(state => state.EmployeeReducer);
  const [form, setForm] = useState({});

  /* 선택한 학사 일정 조회 및 수정모드 구분 */
  const [modifyMode, setModifyMode] = useState(false);

  /* 전체 일정 조회 */
  useEffect(() => {
    dispatch(callAcScheduleListAPI());
  },
    [dispatch]
  );

  // 학사 일정 목록에서 항목 클릭 이벤트 핸들러
  const onScheduleItemClickHandler = (schedule) => {
    dispatch(callAcScheduleByDateAPI(schedule.scheStartDate)); // or scheEndDate depending on what date you want to pass
  };


  /* 입력 양식의 값이 변경될 때 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  /* formatDate => 데이트 형식 지정 */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  /* 학사일정 수정 후 modify 값이 확인되면 목록에 반영/새로고침 */
  useEffect(() => {
    if (modifyAcSche?.status === 200) {
      toast.success("학사 일정 수정이 완료 되었습니다.");
      navigate('/schedule-academic', { replace: true });
      console.log(modifyAcSche);
    }
  }, [modifyAcSche]);

  /* 수정 모드 변경 이벤트 */
  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({ ...acSchedule });
  }

  /* 학사일정 수정 버튼 클릭 이벤트 */
  const onClickAcademicScheduleModifyHandler = () => {

    const formData = new FormData();
    // formData.append("empCode", form.empCode);
    formData.append("empCode", employee.empCode); // 로그인한 사용자의 empCode
    formData.append("scheName", form.scheName);
    formData.append("scheStartDate", formatDate(form.scheStartDate));
    formData.append("scheEndDate", formatDate(form.scheEndDate));
    formData.append("scheType", form.scheType);
    formData.append("scheContent", form.scheContent);
    console.log('regist form ', form)
    console.log('regist formdata ', formData)

    dispatch(callAcScheduleModifyAPI(formData));
  }


  return (
    <motion.div
      className={AcademicScheduleCss.acScheContainer}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <p className={CommonCSS.pageDirection}>학사 일정 관리 ▸학사 일정 수정 및 삭제</p>
      {!modifyMode && <p className={CommonCSS.pageDirection}>학사 일정 관리 ▸ 학사 일정 조회</p>}
      <div></div>
      <div className={AcademicScheduleCss.acScheLeft}>
        <div className={AcademicScheduleCss.acScheRead}>
          <p className={AcademicScheduleCss.acScheTitle}><img src="/images/cal.png"></img>전체 학사 일정</p>
          {allAcSchedule &&
            allAcSchedule.map((schedule) => (
              <div
                key={schedule.scheCode}
                onClick={() => onScheduleItemClickHandler(schedule)}
              >
                <p className={AcademicScheduleCss.acScheListDate}>
                  <span>•</span>
                  <span className={AcademicScheduleCss.acScheStartDate}>{new Date(schedule.scheStartDate).toISOString().split('T')[0]}</span> ~ {new Date(schedule.scheEndDate).toISOString().split('T')[0]}</p>
                <p className={AcademicScheduleCss.acScheListName}><span>•</span> <span className={AcademicScheduleCss.acScheName}>{schedule.scheName}</span> <span className={AcademicScheduleCss.acScheType}>{schedule.scheType}</span></p>
              </div>
            ))}
        </div>

      </div>
      <div className={AcademicScheduleCss.acScheRegist}>
        <div className={AcademicScheduleCss.acScheRead}>
          <p><img src="/images/cal.png"></img>일정 수정 및 삭제</p>
          {!modifyMode && <p><img src="/images/cal.png"></img>일정 조회</p>}
        </div>
        <div className={AcademicScheduleCss.acScheRegistName}>
          <span>일정명</span>
          <input
            type='text'
            name="scheName"
            readOnly={!modifyMode} // 수정모드가 아닐 때는 입력 불가능
            value={acSchedule.scheName}
            required
            onChange={onChangeHandler}></input>
          <br />
        </div>

        <div className={AcademicScheduleCss.acScheRegistDevide}>
          <div className={AcademicScheduleCss.acScheRegistType}>
            <span>구분</span>
            <input type="text"
              readOnly
              name="scheType"
              value={form.scheType}></input>
          </div>
          <div className={AcademicScheduleCss.acScheRegistEmployee}>
            <span>등록자</span>
            <input
              type="text"
              name="empCode"
              readOnly={!modifyMode} // 수정모드가 아닐 때는 입력 불가능
              value={form.empCode}>
            </input>
          </div>
        </div>



        <div className={AcademicScheduleCss.acScheRegistDate}>
          <span>일시</span>
          <div className={AcademicScheduleCss.acScheDateInput}>
            <input
              type='date'
              name="scheStartDate"
              required
              onChange={onChangeHandler}>
            </input>
            <span>~</span>
            <input
              type='date'
              name="scheEndDate"
              required
              onChange={onChangeHandler}></input>
          </div>
          <br />
        </div>

        <div className={AcademicScheduleCss.acScheDetail}>
          <span>일정 상세</span>
          <textarea
            name="scheContent"
            required
            onChange={onChangeHandler}></textarea>
        </div>
        <br />
        {!modifyMode && <button onClick={onClickModifyModeHandler} className={AcademicScheduleCss.acScheRegistBtn}>수정</button>}
        {!modifyMode && <button className={AcademicScheduleCss.acScheRegistBtn}>삭제</button>}
        <button onClick={onClickAcademicScheduleModifyHandler} className={AcademicScheduleCss.acScheRegistBtn}>저장</button>
        <button onClick={() => navigate(-1)} className={AcademicScheduleCss.acScheRegistBtn}>취소</button>
      </div>

    </motion.div>
  );
}

export default AcademicSchedule;