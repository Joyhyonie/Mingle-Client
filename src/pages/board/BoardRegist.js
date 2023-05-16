import { motion } from "framer-motion"
import CommonCSS from '../../css/common/Common.module.css'
import BoardCSS from '../../css/Board.module.css';

function BoardRegist () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <p className={ CommonCSS.pageDirection }>공지사항 ▸ 공지 등록</p>
            <div className={ BoardCSS.buttonBox }>
                <button className={ BoardCSS.whiteButton }>취소</button>
                <button className={ BoardCSS.pinkButton }>등록</button>
            </div>
            <div className={ BoardCSS.InputBox }>
                <input type="text" className={ BoardCSS.inputTitle }/>
                <select className={ BoardCSS.selectType }>
                    <option value='학사'>학사</option>
                    <option value='장학'>장학</option>
                    <option value='행사'>행사</option>
                    <option value='취업'>취업</option>
                    <option value='기타'>기타</option>
                </select>
                {/* <img src={`./images/down.png`}/> */}
                <img src={`${process.env.PUBLIC_URL}/images/down.png`}/>
            </div>
            <div className={ BoardCSS.contentBox }>
                메롱
            </div>
        </motion.div>
    );
}

export default BoardRegist;