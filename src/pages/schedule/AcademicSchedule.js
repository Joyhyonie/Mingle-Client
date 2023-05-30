/* 행정 직원의 학사 일정 관리 */
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { callAcScheduleListAPI, callAcScheduleRegistAPI, callAcScheduleModifyAPI, callAcScheduleByDateAPI, callAcScheduleDeleteAPI } from '../../apis/ScheduleAPICalls';
import { toast } from "react-hot-toast";
import AcademicScheduleCss from "../../css/AcademicSchedule.module.css";
import CommonCSS from '../../css/common/Common.module.css';


function AcademicSchedule() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allAcSchedule, registAcSche, acSchedule } = useSelector((state) => state.ScheduleReducer);
  const { employee } = useSelector(state => state.EmployeeReducer);
  const [form, setForm] = useState({
    scheType: '학사',
  });
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [sortedAcSchedule, setSortedAcSchedule] = useState([]);
  const [isEditable, setIsEditable] = useState(false); // 추가: 수정 모드 상태

  /* 학사 일정 리스트 */
  useEffect(() => {
    dispatch(callAcScheduleListAPI());
  },
    [dispatch]
  );

  /* 학사 일정 항목 클릭 이벤트 */
  const onScheduleItemClickHandler = async (acSchedule) => {
    setSelectedSchedule(acSchedule);
    setForm(acSchedule);
  }

  /* 수정버튼 클릭 시 수정모드로 전환 */
  const onClickEditButtonHandler = () => {
    setIsEditable(true);
  }


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

  /* 학사일정 등록 후 regist 값이 확인되면 목록에 반영/새로고침 */
  useEffect(() => {
    if (registAcSche?.status === 200) {
      toast.success("학사 일정 등록이 완료 되었습니다.");
      navigate('/schedule-academic', { replace: true });
      console.log(registAcSche);
    }
  }, [registAcSche]);

  /* 돌아가기를 눌렀을 때, 새로고침 */
  const onBackButtonClickHandler = () => {
    setForm({
      scheType: '학사',
      scheName: '',
      scheStartDate: '',
      scheEndDate: '',
      scheContent: '',
    });
    setSelectedSchedule(null);
  }

  /* allAcSchedule 배열을 scheStartDate 필드 기준으로 오름차순 정렬 */
  useEffect(() => {
    if (allAcSchedule) {
      let sortedData = [...allAcSchedule];
      sortedData.sort((a, b) => new Date(a.scheStartDate) - new Date(b.scheStartDate));
      setSortedAcSchedule(sortedData);
    }
  }, [allAcSchedule]);


  /* 학사일정 등록 버튼 클릭 이벤트 */
  const onClickAcademicScheduleRegistHandler = () => {

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

    dispatch(callAcScheduleRegistAPI(formData));
  }

  /* 학사일정 수정 버튼 클릭 이벤트 */
  const onClickAcademicScheduleModifyHandler = async () => {
    if (selectedSchedule) {
      const formData = new FormData();
      formData.append("empCode", employee.empCode); // 로그인한 사용자의 empCode
      formData.append("scheName", form.scheName);
      formData.append("scheStartDate", formatDate(form.scheStartDate));
      formData.append("scheEndDate", formatDate(form.scheEndDate));
      formData.append("scheType", form.scheType);
      formData.append("scheContent", form.scheContent);

      await dispatch(callAcScheduleModifyAPI(formData));
      // 학사일정 조회 업데이트
      dispatch(callAcScheduleListAPI({}));
      toast.success("일정이 성공적으로 수정되었습니다.");
      navigate('/schedule-academic', { replace: true });
      setIsEditable(false); // 수정 후에는 다시 읽기 전용 상태로 변경
    }
  };

  /* 학사일정 삭제 버튼 클릭 이벤트 */
  const onClickAcademicScheduleDeleteHandler = async () => {
    if (selectedSchedule) {
      await dispatch(callAcScheduleDeleteAPI(selectedSchedule.scheCode));
      // 학사일정 조회 업데이트
      dispatch(callAcScheduleListAPI({}));
      toast.success("일정이 성공적으로 삭제되었습니다.");
      navigate('/schedule-academic', { replace: true });
      setSelectedSchedule(null)
    }

  };


  return (
    <motion.div
      className={AcademicScheduleCss.acScheContainer}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <p className={CommonCSS.pageDirection}>학사 일정 관리 ▸ 학사 일정 조회 및 등록</p>
      <div></div>
      <div className={AcademicScheduleCss.acScheLeft}>
        <div className={AcademicScheduleCss.acScheRead}>
          <p>전체 학사 일정</p>
          {allAcSchedule &&
            allAcSchedule.map((schedule) => (
              <div
                key={schedule.scheCode}
                onClick={() => onScheduleItemClickHandler(schedule)}
                className={AcademicScheduleCss.acScheList}
                tabIndex="0"
              >
                <p className={AcademicScheduleCss.acScheListDate}>
                  <span>•</span>
                  <span className={AcademicScheduleCss.acScheStartDate}>{new Date(schedule.scheStartDate).toISOString().split('T')[0]}</span>
                  ~
                  <span className={AcademicScheduleCss.acScheEndDate}>{new Date(schedule.scheEndDate).toISOString().split('T')[0]}</span>
                  <span className={AcademicScheduleCss.acScheType}>{schedule.scheType}</span>
                </p>
                <p className={AcademicScheduleCss.acScheListName}><span className={AcademicScheduleCss.acScheName}>{schedule.scheName}</span></p>
              </div>
            ))}
        </div>

      </div>

      {selectedSchedule && !isEditable ?
        /* 학사일정 상세 조회 컴포넌트 */
        <div className={AcademicScheduleCss.acScheRegist}>
          <div className={AcademicScheduleCss.acScheRead}>
            <p>일정 상세 조회</p>
          </div>
          <div className={AcademicScheduleCss.acScheRegistDetailTitle}>
            <div className={AcademicScheduleCss.acScheRegistName}>
              <span>일정명</span>
              <input
                type='text'
                name="scheName"
                value={selectedSchedule.scheName}
                readOnly></input>
            </div>
            <div className={AcademicScheduleCss.acScheRegistType}>
              <span>구분</span>
              <input type="text"
                readOnly
                name="scheType"
                value={selectedSchedule.scheType}></input>
            </div>
          </div>

          <div className={AcademicScheduleCss.acScheRegistDate}>
            <span>일시</span>
            <div className={AcademicScheduleCss.acScheDateInput}>
              <input
                type='date'
                name="scheStartDate"
                value={formatDate(selectedSchedule.scheStartDate)}
                readOnly>
              </input>
              <span>~</span>
              <input
                type='date'
                name="scheEndDate"
                value={formatDate(selectedSchedule.scheEndDate)}
                readOnly></input>
            </div>
            <br />
          </div>

          <div className={AcademicScheduleCss.acScheDetail}>
            <span>일정 상세</span>
            <textarea
              name="scheContent"
              value={selectedSchedule.scheContent}
              readOnly></textarea>
          </div>
          <br />
          <button onClick={onBackButtonClickHandler} className={AcademicScheduleCss.acScheRegistBtn}>돌아가기</button>
          <button onClick={onClickAcademicScheduleDeleteHandler} className={AcademicScheduleCss.acScheRegistBtn}>삭제</button>
          <button onClick={onClickEditButtonHandler} className={AcademicScheduleCss.acScheRegistBtn}>수정</button>
        </div>
          :
          /* 학사일정 등록 모드 컴포넌트 */
          <div className={AcademicScheduleCss.acScheRegist}>
            <div className={AcademicScheduleCss.acScheRead}>
              <p>일정 등록</p>
            </div>
            <div className={AcademicScheduleCss.acScheRegistDevide}>
              <div className={AcademicScheduleCss.acScheRegistName}>
                <span>일정명</span>
                <input
                  type='text'
                  name="scheName"
                  required
                  onChange={onChangeHandler}></input>
                <br />
              </div>
              <div className={AcademicScheduleCss.acScheRegistType}>
                <span>구분</span>
                <input type="text"
                  readOnly
                  name="scheType"
                  value={form.scheType}></input>
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
            <button onClick={onClickAcademicScheduleRegistHandler} className={AcademicScheduleCss.acScheRegistBtn}>등록</button>
          </div>
      }
    </motion.div >
  );
}

export default AcademicSchedule;