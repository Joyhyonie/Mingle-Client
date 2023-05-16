import { motion } from "framer-motion"
import CommonCSS from '../../css/common/Common.module.css'

function BoardList () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <p className={ CommonCSS.pageDirection }>공지사항 ▸ 공지 상세 내용</p>
        </motion.div>
    );
}

export default BoardList;