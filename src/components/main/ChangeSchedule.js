/* 나의 일정 & 학사 일정 선택 컴포넌트 */
import MainCSS from "../../css/Main.module.css"

function ChangeSchedule ({isMyCalendar, setIsMyCalendar}) {

    return (
        <div className={ MainCSS.selectSchduleBox }>
            <div
                className={isMyCalendar ? MainCSS.clickedSchedule : MainCSS.unclickedSchedule}
                onClick={ () => setIsMyCalendar(true) }
            >
                나의 일정
            </div>
            <div
                className={isMyCalendar ? MainCSS.unclickedSchedule : MainCSS.clickedSchedule}
                onClick={ () => setIsMyCalendar(false) }
            >
                학사 일정
            </div>
        </div>
    );
}

export default ChangeSchedule;