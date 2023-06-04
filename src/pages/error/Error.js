import { motion } from "framer-motion"
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CommonCSS from "../../css/common/Common.module.css";

function Error() {

    const navigate = useNavigate();

    useEffect(
        () => {
            toast.error("권한이 없습니다!")
        },[]
    );

    return (
        <motion.div
            className={ CommonCSS.back }
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <button  onClick={() => navigate(-2)}>돌아가기</button>
        </motion.div>
    );

}

export default Error;