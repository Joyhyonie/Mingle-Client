import { motion } from "framer-motion"
import MainCSS from "../../css/Main.module.css"

function MyCalenderInfo () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div className={ MainCSS.myScheduleInfoBox }>
                <div className={ MainCSS.dateAndAdd }>
                    <p>5월 12일 금요일</p>
                    <div>추가</div>
                </div>
                <div className={ MainCSS.toDoItemList }>
                    <div className={ MainCSS.toDoItemBox }>
                        <div className={ MainCSS.colorAndToDo }>
                            <div className={ MainCSS.colorBox } style={{background:"#B6E37B"}}></div>
                            <p>교무처 관련 서류 정리 후 제출</p>
                        </div>
                        <img src="./images/unchecked.png"></img>
                    </div>
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