import { motion } from "framer-motion"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // interaction 패키지 추가설치 필요
import { INITIAL_EVENTS, createEventId } from "../../utils/MyCalenderEventUtils"; // 이벤트 셋팅 함수
import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';

function MyCalender ({dateInMyCal, setDateInMyCal}) {

    const [currentEvents, setCurrentEvents] = useState([]);
  
    const eventsHanlder = (events) => {
      // setCurrentEvents(events);
    };
    
    /* 클릭한 날짜의 toDoList를 조회하기 위한 함수 */
    const dateSelectHanlder = (selectInfo) => {
      const clickedDate = selectInfo.startStr;
      console.log(`클릭한 날짜 ? ${clickedDate}`)

      setDateInMyCal(clickedDate);
    };

    const FullCalendarContainer = styled.div`
      display: flex;
      justify-content: center;
      
      
      // 캘린더 전체 사이즈 조정
      .fc {
        width: 98%;
        height: 720px;
        // z-index: -1;
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
        cursor: pointer;

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
        margin-bottom: 2px;
        height: 7px;
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
            dayMaxEvents={3}
            eventsSet={eventsHanlder}
            events= {[
              {
              // title: '교무처 관련 서류 정리 후 제출',
              start: '2023-05-12',
              color: '#B6E37B'
              },
              {
              // title: '외식조리학과 학과장님 세미나 자료 준비',
              start: '2023-05-12',
              end: '2023-05-14',
              color: '#FFE39B'
              },
              {
                // title: '3층 시설물 안전 점검 신청',
                start: '2023-05-12',
                end: '2023-05-16',
                color: '#7BD1E3'
              },
              {
                // title: '3층 시설물 안전 점검 신청',
                start: '2023-05-12',
                end: '2023-05-15',
                color: '#FF9B9B'
              }
            ]}
            />
          </FullCalendarContainer>
        </motion.div>
    );
  
    
}

export default MyCalender;