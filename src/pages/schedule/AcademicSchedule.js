/* 행정 직원의 학사 일정 관리 */
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callAcScheduleListAPI } from '../../apis/ScheduleAPICalls';
import AcademicScheduleCss from "../../css/AcademicSchedule.module.css";
import CommonCSS from '../../css/common/Common.module.css';

function AcademicSchedule() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callAcScheduleListAPI());
  },
    [dispatch]
  );

  const { allAcSchedule } = useSelector((state) => state.ScheduleReducer);

  return (
    <motion.div
      className={AcademicScheduleCss.acScheContainer}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <p className={CommonCSS.pageDirection}>학사 일정 관리 ▸ 학사 일정 조회 및 등록</p>
      <div></div>
      <div className={AcademicScheduleCss.acScheLeft}>
        <div className={AcademicScheduleCss.acScheRead}>
          <p className={AcademicScheduleCss.acScheTitle}><img src="/images/cal.png"></img>전체 학사 일정</p>
          {allAcSchedule &&
            allAcSchedule.map((schedule) => (
              <div
                key={schedule.scheCode}
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
          <p><img src="/images/cal.png"></img>일정 등록</p>
        </div>
        <div className={AcademicScheduleCss.acScheRegistName}>
          <span>일정명</span>
          <input type='text' required></input>
          <br />
        </div>

        <div className={AcademicScheduleCss.acScheRegistDate}>
          <span>일시</span>
          <div className={AcademicScheduleCss.acScheDateInput}>
            <input type='date' required></input><span>~</span>
            <input type='date' required></input>
          </div>
          <br />
        </div>

        <div className={AcademicScheduleCss.acScheDetail}>
          <span>일정 상세</span>
          <textarea required></textarea>
        </div>
        <br />
        <button className={AcademicScheduleCss.acScheRegistBtn}>등록</button>
      </div>
      
    </motion.div>
  );
}

export default AcademicSchedule;