/* 행정 직원의 학사 일정 관리 */
import { motion } from "framer-motion"
import AcademicScheduleCss from "../../css/AcademicSchedule.module.css";

function AcademicSchedule() {

  return (
    <div className={AcademicScheduleCss.acScheContainer}>    
      <div className={AcademicScheduleCss.acScheLeft}> 
        <div className={AcademicScheduleCss.acScheRead}>
          <p><img src="/images/cal.png"></img>전체 학사 일정</p>
        </div>

        <div>
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
      </div>
      <div className={AcademicScheduleCss.acScheRegist}>
        <p><img src="/images/cal.png"></img>일정 등록</p>
        <form className={AcademicScheduleCss.acScheForm}>
          <div className={AcademicScheduleCss.acScheName}><span>일정명</span><input className={AcademicScheduleCss.acScheInputOne} type='text' required ></input><br /></div>
          <div className={AcademicScheduleCss.acScheTime}><span>일시</span><input className={AcademicScheduleCss.acScheInputTwo} type='date' required></input><span>~</span>
            <input className={AcademicScheduleCss.acScheInputTwo} type='date' required></input><br /></div>
          <div className={AcademicScheduleCss.acScheName}><span>일정명</span><input className={AcademicScheduleCss.acScheInputOne} type='text' required ></input></div>
          <div className={AcademicScheduleCss.acScheTime}><span>일시</span><input className={AcademicScheduleCss.acScheInputTwo} type='date' required></input>~
            <input className={AcademicScheduleCss.acScheInputTwo} type='date' required></input></div>
          <div className={AcademicScheduleCss.acScheDetail}><span>일정 상세</span>
            <textarea className={AcademicScheduleCss.acScheInputThree} required></textarea></div>
          <br />
          <button className={AcademicScheduleCss.acScheBtn}>등록</button>
        </form>
      </div>
    </div>
  );
}

export default AcademicSchedule;