/* 행정 직원의 학사 일정 관리 */
import { motion } from "framer-motion"
import AcademicScheduleCss from "../../css/AcademicSchedule.module.css";
import CommonCSS from '../../css/common/Common.module.css';

function AcademicSchedule() {

  return (
    <motion.div
      className={AcademicScheduleCss.acScheContainer}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <p className={CommonCSS.pageDirection}>학사 관리 {'>'} 교직원</p>
      <div className={AcademicScheduleCss.acScheLeft}>
        <div className={AcademicScheduleCss.acScheRead}>
          <p><img src="/images/cal.png"></img>전체 학사 일정</p>
        </div>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
        <p>- 목록입니다.</p>
      </div>
      <div className={AcademicScheduleCss.acScheRegist}>
        <div className={AcademicScheduleCss.acScheRead}>
          <p><img src="/images/cal.png"></img>일정 등록</p>
        </div>
        <div className={AcademicScheduleCss.acScheName}>
          <span>일정명</span>
          <input type='text' required></input>
          <br />
        </div>

        <div className={AcademicScheduleCss.acScheDate}>
          <span>일시</span>
          <div className={AcademicScheduleCss.acScheDateInput}>
            <input type='date' required></input>~
          <input type='date' required></input>
          </div>
          <br/>
        </div>

        <div className={AcademicScheduleCss.acScheDetail}>
          <span>일정 상세</span>
          <textarea required></textarea>
        </div>
        <br />
        <button>등록</button>
      </div>
    </motion.div>
  );
}

export default AcademicSchedule;