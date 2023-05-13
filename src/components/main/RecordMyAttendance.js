import MainCSS from "../../css/Main.module.css"

function RecordMyAttendance () {

    /* 로그인한 유저가 오늘 날짜로 출퇴근 기록이 있는지 조회 후, 존재한다면 시간을 보여주는 테스트 */
    const today = new Date();
    const dateString = today.toISOString().substr(0, 10); // 포맷팅된 오늘의 날짜 (2023-05-13)
    // API에서 받아온 데이터 중에서 오늘의 날짜와 일치하는 데이터만 추출
    // const todayData = apiData.filter(data => data.date === dateString);
    const todayData = '';
    const todayData2 = '';

    /* 출근 시각 포맷 함수 */
    // const startTimeHandler = () => {
    //     const hours = empAtdStartTime.getHours();
    //     const minutes = empAtdStartTime.getMinutes();
    //     const ampm = hours < 12 ? '오전' : '오후';
    //     const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    //     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    //     return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;   
    // }

    /* 퇴근 시각 포맷 함수 */
    // const endTimeHandler = () => {
    //     const hours = empAtdEndTime.getHours();
    //     const minutes = empAtdEndTime.getMinutes();
    //     const ampm = hours < 12 ? '오전' : '오후';
    //     const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    //     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    //     return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;
    // }

    const startTimeClickHandler = () => {
        console.log('출근 기록 모달창 오픈!')
    }

    /* 퇴근 시각 등록 전, 출근 시각이 존재하는지 확인한 후 퇴근 기록 모달창을 오픈하는 이벤트 함수 */
    const endTimeClickHandler = () => {

        if(todayData) { /* 이후에 todayData.empAtdStartTime이 와야함 */
            console.log('퇴근 기록 모달창 오픈!')
        } else {
            alert('오늘의 출근 시각을 먼저 기록해주세요 :)');
        }

    }

    return (
        <div className={ MainCSS.recordBox }>
            { todayData ? /* 이후에 todayData.empAtdStartTime이 와야함 */
            (<div>
                {/* <p>{startTimeHandler()}</p> */}
                <p>오전 8시 52분</p>
                <div
                    onClick={ () => alert('이미 오늘의 출근 시각이 기록되었습니다 :)') }
                    style={{ background:'#E6E6E6' }}>
                    출근 완료
                </div>
            </div>) : 
            (<div>
                <div
                    onClick={ startTimeClickHandler }>
                    출근 기록
                </div>
            </div>)
            }

            { todayData2 ? /* 이후에 todayData.empAtdEndTime이 와야함 */
            (<div>
                {/* <p>{endTimeHandler()}</p> */}
                <p>오후 5시 13분</p>
                <div
                    onClick={ () => alert('이미 오늘의 퇴근 시각이 기록되었습니다 :)') }
                    style={{ background:'#E6E6E6' }}>
                    퇴근 완료
                </div>
            </div>) : 
            (<div>
                <div
                    onClick={ endTimeClickHandler }
                >    
                    퇴근 기록
                </div>
            </div>)
            }
        </div>
    );
}

export default RecordMyAttendance;