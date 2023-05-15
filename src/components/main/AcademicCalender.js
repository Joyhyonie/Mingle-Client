import { motion } from "framer-motion"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // interaction 패키지 추가설치 필요
import { INITIAL_EVENTS, createEventId } from "../../utils/MyCalenderEventUtils"; // 이벤트 셋팅 함수
import { useState } from "react";
import styled from 'styled-components';

function AcademicCalender ({dateInAcCal, setDateInAcCal}) {

    const [currentEvents, setCurrentEvents] = useState([]);
  
    const eventsHanlder = (events) => {
      // setCurrentEvents(events);
    };
    
    /* 클릭한 날짜의 toDoList를 조회하기 위한 함수 */
    const dateSelectHanlder = (selectInfo) => {
      const clickedDate = selectInfo.startStr;
      console.log(`클릭한 날짜 ? ${clickedDate}`)

      setDateInAcCal(clickedDate);
    };

    

    const FullCalendarContainer = styled.div`
      display: flex;
      justify-content: center;
      
      // 캘린더 전체 사이즈 조정
      .fc {
        width: 98%;
        height: 720px;
      }

      // 캘린더 Header
      .fc .fc-toolbar.fc-header-toolbar {
        margin: -5px 0px 15px;
        padding: 20px;
        height: 70px;
        font-size: 18px;
        line-height: 29px;
        color: #343434;
      }

      // toolbar 버튼
      .fc .fc-button {
        background-color: #ffd7d7;
        border: none;
        outline: none; /* 버튼 클릭 시 외곽선 제거 */

        span {
          font-weight: 600;
          font-size: 28px;
        }

        :hover {
          background-color: #ff9797;
        }
      }

      .fc-button-group {
        border: none;
      }

      // 요일 container
      .fc-theme-standard th {
        height: 32px;
        padding-top: 3.5px;
        padding: 6px;
        border: none;
        border-radius: 10px;
        background: #FFD7D7;
        font-weight: 600;
        font-size: 23px;
        line-height: 19px;
        color: #ffffff;
      }

      // 달력 내부의 스크롤바 숨기기
      .fc-scroller {
        &::-webkit-scrollbar {
          display: none; // Chrome, Safari, Opera 등의 웹킷 기반 브라우저에서 스크롤바 숨기기
        }
        -ms-overflow-style: none; // Internet Explorer 및 Edge에서 스크롤바 숨기기
        scrollbar-width: none; // Firefox에서 스크롤바 숨기기
      }

      // 내부 테두리
      .fc-daygrid-day {
        border: 5px solid white;
      }

      // 오늘 날짜 색
      .fc .fc-daygrid-day.fc-day-today {
        background-color: #FF9797;
      }

      // 날짜별 그리드
      .fc-daygrid-day-frame {
        padding: 2px;
        height: 90px;
        border-radius: 15px;
        background-color: #FDFDFD;
      }

      // 날짜
      .fc .fc-daygrid-day-top {
        color: #666666;
      }

      // 각 이벤트 요소
      .fc-event {
        background: white;
        border: 1px solid #FF9797;
        border-radius: 8px;
        margin-bottom: 2px;
        height: 25px;
        padding: 2px;
        font-size: 12px;
      }
    `;


    return (

        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <FullCalendarContainer>
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            weekends={true}
            initialEvents={INITIAL_EVENTS}
            select={dateSelectHanlder}
            selectMirror={true}
            dayMaxEvents={2}
            eventTextColor={'#343434'}
            eventsSet={eventsHanlder}
            events= {[
                {
                title: '2023학년도 1학기 강의 평가 실시',
                start: '2023-05-12',
                end: '2023-05-14',
                },
                {
                title: '2023학년도 1학기 성적열람기간',
                start: '2023-05-12',
                end: '2023-05-14',
                },
                {
                title: '2023학년도 1학기 성적 정정 신청기간',
                start: '2023-05-12',
                end: '2023-05-19',
                },
                {
                title: '제 15회 밍글대학 축제 개최',
                start: '2023-05-17',
                end: '2023-05-20',
                },
                {
                title: '여름학기 시작',
                start: '2023-06-17',
                end: '2023-06-20',
                },
        
    
            ]}
            />
          </FullCalendarContainer>
        </motion.div>
    );
}

export default AcademicCalender;