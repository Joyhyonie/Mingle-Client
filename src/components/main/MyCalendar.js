import { motion } from "framer-motion"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // interaction 패키지 추가설치 필요
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { callMyScheduleByDateAPI, callMyScheduleListAPI } from "../../apis/ScheduleAPICalls";
import dayjs from "dayjs";

function MyCalendar ({setDateInMyCal, setFilteredMySchedule}) {

    const dispatch = useDispatch();
    const { allMySchedule, checkSchedule, registMySche, modifyMySche, removeMySche } = useSelector(state => state.ScheduleReducer);
    const [selectInfo, setSelectInfo] = useState(); // 선택한 날짜의 정보를 저장하기 위한 state

    useEffect(
      () => {

        dispatch(callMyScheduleListAPI());

      },[checkSchedule, registMySche, modifyMySche, removeMySche] 
      // => 일정 등록/수정/삭제 시 바로 캘린더에 적용

    );

    useEffect(() => {

      if(selectInfo) {
        // selectInfo가 존재할 때, 다시 dateSelectHanlder()를 호출하여 MyCalendarInfo 컴포넌트도 리렌더링 되도록 함
        dateSelectHanlder(selectInfo)
      } else {
        // 아직 날짜 선택이 되지 않았을 때, 현재 날짜를 첫 렌더링 시 노출
        const today = dayjs().format('YYYY-MM-DD');
        dateSelectHanlder({ startStr: today });
      }
        
    }, [allMySchedule]);


    
    /* 클릭한 날짜의 toDoList를 조회하기 위한 함수 */
    const dateSelectHanlder = (selectInfo) => {

        const clickedDate = selectInfo.startStr;
        console.log(`클릭한 날짜 ? ${clickedDate}`)
        // 선택한 날짜 set
        setDateInMyCal(clickedDate);
        // 선택한 날짜의 정보 set (MyCalendarInfo 컴포넌트도 리렌더링 시키기 위해)
        setSelectInfo(selectInfo);

        /* 클릭한 날짜에 속하는 일정들만을 MyCalendarInfo에 보내기 위한 filter 함수 */
        if(allMySchedule) {
          const filteredSchedule = allMySchedule.filter(schedule => {

            const startDate = dayjs(schedule.scheStartDate);
            const endDate = dayjs(schedule.scheEndDate).endOf('day'); // 해당 날짜의 자정 이후까지 조회

            return dayjs(clickedDate).isSame(startDate) || 
                  dayjs(clickedDate).isSame(endDate) || 
                  (dayjs(clickedDate).isAfter(startDate) && dayjs(clickedDate).isBefore(endDate));

          });
        
        console.log('filteredSchedule => ', filteredSchedule);
        setFilteredMySchedule(filteredSchedule); // 선택된 날짜의 나의 일정을 조회시키기 위한 state에 set
        }
    };

    

    /* 조회한 나의 일정 전체 캘린더 event로 넣기 */
    const myEvents = () => {

      if(allMySchedule) {
        return allMySchedule.map(schedule => ({
          id: schedule.scheCode,
          start: schedule.scheStartDate,
          end: dayjs(schedule.scheEndDate).add(1,'day').format('YYYY-MM-DD'),
          color: schedule.colorCode 
        }))
      }
      
    }

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
          cursor: pointer;

          span {
            font-weight: 600;
            font-size: 28px;
          }

          :hover {
            background-color: #ff9797;
          }
        }

        .fc thead {
          border-bottom: none;
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
            select={ dateSelectHanlder }
            selectMirror={true}
            dayMaxEvents={3}
            events={allMySchedule && myEvents()}
            displayEventTime={false} // 12a 보이지 않도록 하는 속성
            />
          </FullCalendarContainer>
        </motion.div>
    );
  
    
}

export default MyCalendar;