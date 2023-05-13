import { motion } from "framer-motion"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko"; // 언어지정(한국어)
import interactionPlugin from "@fullcalendar/interaction"; // interaction 패키지 추가설치 필요
import { INITIAL_EVENTS, createEventId } from "../../utils/MyCalenderEventUtils"; // 이벤트 셋팅 함수
import { useState } from "react";

function MyCalender () {

    const [currentEvents, setCurrentEvents] = useState([]);

    const eventsHanlder = (events) => {
        setCurrentEvents(events);
      };
    
      const eventClickHanlder = (selectInfo) => {
        alert("삭제할 이벤트 ID: " + selectInfo.event.id);
    
        if (window.confirm(`'${selectInfo.event.title}'을 삭제하시겠습니까?`)) {
          selectInfo.event.remove();
        }
      };
    
      const dateSelectHanlder = (selectInfo) => {
        let title = prompt("새로운 내용을 입력해 주세요 :)");
        let calendarApi = selectInfo.view.calendar;
    
        calendarApi.unselect();
    
        if (title) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
          });
        }
      };


    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            locale={koLocale}
            initialView="dayGridMonth"
            selectable={true}
            weekends={true}
            initialEvents={INITIAL_EVENTS}
            eventClick={eventClickHanlder}
            select={dateSelectHanlder}
            eventsSet={eventsHanlder}
            />
        </motion.div>
    );
}

export default MyCalender;