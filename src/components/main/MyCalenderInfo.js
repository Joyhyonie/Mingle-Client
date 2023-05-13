import { motion } from "framer-motion"
import MainCSS from "../../css/Main.module.css"
import { useState } from "react";

function MyCalenderInfo () {

    const [isDone, setIsDone] = useState(false); // (임시용) 완료된 toDoItem 여부

    /* toDo를 생성하기 위한 이벤트 함수 */
    const addToDoHandler = () => {
        console.log('To-Do 추가 함수!')
    }

    /* 하나의 toDoItem을 더블 클릭했을 때 해당 toDo의 상세 모달창을 띄우는 이벤트 함수 */
    const toDoItemClickHandler = () => {
        console.log('To-Do 상세 모달창 띄우는 함수!')
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div className={ MainCSS.ScheduleInfoBox }>
                <div className={ MainCSS.dateBox }>
                    <p>5월 12일 금요일</p>
                    <div
                        onClick={ addToDoHandler }
                    >
                        추가
                    </div>
                </div>
                <div className={ MainCSS.toDoItemList }>
                    <div className={ MainCSS.toDoItemBox }>
                        <div className={ MainCSS.colorAndToDo }>
                            <div className={ MainCSS.colorBox } style={{background:"#B6E37B"}}></div>
                            <p
                                style={isDone ? {textDecoration: 'line-through'} : null}
                                onDoubleClick={ toDoItemClickHandler }
                            >
                                교무처 관련 서류 정리 후 제출
                            </p>
                        </div>
                        <img 
                            src={ isDone ? "./images/checked.png" : "./images/unchecked.png"}
                            onClick={ () => setIsDone(!isDone) }
                        />
                    </div>

                    {/*  ---------------- 아래부터는 dummy data ----------------  */}

                    <div className={ MainCSS.toDoItemBox }>
                        <div className={ MainCSS.colorAndToDo }>
                            <div className={ MainCSS.colorBox } style={{background:"#FFE39B"}}></div>
                            <p>외식조리학과 학과장님 세미나 자료 준비</p>
                        </div>
                        <img src="./images/unchecked.png"></img>
                    </div>
                    <div className={ MainCSS.toDoItemBox }>
                        <div className={ MainCSS.colorAndToDo }>
                            <div className={ MainCSS.colorBox } style={{ background:"#FF9B9B" }}></div>
                            <p style={{textDecoration:'line-through'}}>3층 시설물 안전 점검 신청</p>
                        </div>
                        <img src="./images/checked.png"></img>
                    </div>
                    <div className={ MainCSS.toDoItemBox }>
                        <div className={ MainCSS.colorAndToDo }>
                            <div className={ MainCSS.colorBox } style={{ background:"#FF9B9B" }}></div>
                            <p style={{textDecoration:'line-through'}}>3층 시설물 안전 점검 신청</p>
                        </div>
                        <img src="./images/checked.png"></img>
                    </div>
                    <div className={ MainCSS.toDoItemBox }>
                        <div className={ MainCSS.colorAndToDo }>
                            <div className={ MainCSS.colorBox } style={{ background:"#FF9B9B" }}></div>
                            <p style={{textDecoration:'line-through'}}>3층 시설물 안전 점검 신청</p>
                        </div>
                        <img src="./images/checked.png"></img>
                    </div>
                </div>
                
            </div>
        </motion.div>
    );
}

export default MyCalenderInfo;