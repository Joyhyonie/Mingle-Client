import { motion } from "framer-motion"
import CommonCSS from '../../css/common/Common.module.css'
import BoardLayout from "../../layouts/BoardLayout";

function BoardList () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <BoardLayout/>
        </motion.div>
    );
}

export default BoardList;