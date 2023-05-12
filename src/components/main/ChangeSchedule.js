/* 나의 일정 & 학사 일정 선택 컴포넌트 */
import MainCSS from "../../css/Main.module.css"

function ChangeSchedule ({isMyCalender, setIsMyCalender}) {

    return (
        <div className={ MainCSS.selectSchduleBox }>
            <div
                className={isMyCalender ? MainCSS.clickedSchedule : MainCSS.unclickedSchedule}
                onClick={ () => setIsMyCalender(true) }
            >
                나의 일정
            </div>
            <div
                className={isMyCalender ? MainCSS.unclickedSchedule : MainCSS.clickedSchedule}
                onClick={ () => setIsMyCalender(false) }
            >
                학사 일정
            </div>
        </div>
    );
}

export default ChangeSchedule;