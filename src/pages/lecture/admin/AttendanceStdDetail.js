import { motion } from "framer-motion"
function AttendanceStdDetail({ attendance }) {


    return (
        <motion.tr
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}

        >


            <p>뭐가 나오나

            </p>
            <p>{attendance}</p>

        </motion.tr>
    )
}

export default AttendanceStdDetail;