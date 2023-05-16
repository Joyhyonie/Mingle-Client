import { motion } from "framer-motion"
import { useNavigate } from "react-router";

function BoardItem ({board}) {

    const navigate = useNavigate();

    const clickBoardHandler = (boardCode) => {
        navigate(`/board/${boardCode}`);
    }

    return (
        <motion.tr
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
            onClick={ () => clickBoardHandler(board.boardCode) }
        >
            <td>{board.boardCode}</td>
            <td>{board.boardType}</td>
            <td>{board.boardTitle}</td>
            <td>{board.empName}</td>
            <td>{board.boardModifyDate ? board.boardModifyDate : board.boardWriteDate}</td>
            <td>{board.boardCount}</td>
        </motion.tr>
    );
}

export default BoardItem;