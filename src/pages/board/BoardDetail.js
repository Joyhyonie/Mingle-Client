import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

function BoardDetail () {

    const dispatch = useDispatch();
    const params = useParams();
    const boardCode = params.boardCode;
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            안녕 나는 {boardCode}번 게시물이얌
        </motion.div>
    );
}

export default BoardDetail;