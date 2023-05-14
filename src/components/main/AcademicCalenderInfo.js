import { motion } from "framer-motion"
import MainCSS from "../../css/Main.module.css"

function AcademicCalenderInfo ({dateInAcCal}) {

    const academicItemClickHandler = () => {
        console.log('학사 일정 상세 모달창 띄우는 함수!')
    }

    /* (임시용) API에서 넘어온 DATE 문자열을 포맷하기 위한 테스트 */
    const dateString = '2023-05-18T10:30:00Z';
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;

    /* (암시용 )학사일정명이 23자 이상일 경우 그 뒤는 ...으로 화면에 노출되게끔 하기 위한 테스트 */
    const text = '2023학년도 1학기 강의 평가 실시 (3학년 우선 실시)';

    /* 클릭된 날짜의 월/일/요일을 변경시키는 이벤트 함수 */
    const clickedDateHandler = () => {
        const clickedDate = new Date(dateInAcCal);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return `${clickedDate.getMonth() + 1}월 ${clickedDate.getDate()}일 ${days[clickedDate.getDay()]}요일`;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div className={ MainCSS.ScheduleInfoBox }>
                <div className={ MainCSS.dateBox }>
                    <p>{clickedDateHandler()}</p>
                </div>
                <div className={ MainCSS.academicItemList }>
                    <div className={ MainCSS.academicItemBox }>
                        <div>
                            ~ {formattedDate}
                        </div>
                        <p
                            onDoubleClick={ academicItemClickHandler }
                        >
                            { text.length > 20 ? text.slice(0, 23) + '...' : text }
                        </p>
                    </div>

                    {/*  ---------------- 아래부터는 dummy data ----------------  */}
                    
                    <div className={ MainCSS.academicItemBox }>
                        <div>
                            ~ {formattedDate}
                        </div>
                        <p>
                            { text.length > 20 ? text.slice(0, 23) + '...' : text }
                        </p>
                    </div>
                    <div className={ MainCSS.academicItemBox }>
                        <div>
                            ~ {formattedDate}
                        </div>
                        <p>
                            { text.length > 20 ? text.slice(0, 23) + '...' : text }
                        </p>
                    </div>
                    <div className={ MainCSS.academicItemBox }>
                        <div>
                            ~ {formattedDate}
                        </div>
                        <p>
                            { text.length > 20 ? text.slice(0, 23) + '...' : text }
                        </p>
                    </div>
                    <div className={ MainCSS.academicItemBox }>
                        <div>
                            ~ {formattedDate}
                        </div>
                        <p>
                            { text.length > 20 ? text.slice(0, 23) + '...' : text }
                        </p>
                    </div>
                    
                </div>
            </div>
        </motion.div>
    );
}

export default AcademicCalenderInfo;