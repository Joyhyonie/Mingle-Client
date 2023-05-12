/* 행정직원의 '교직원 관리' */
import { motion } from "framer-motion"

function EmployeeManagement () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            교직원 관리 👻
        </motion.div>
    );
}

export default EmployeeManagement;