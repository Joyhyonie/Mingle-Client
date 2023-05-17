import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function BoardItem ({board}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clickBoardHandler = (boardCode) => {

        /* 해당 공지사항을 클릭 시, 조회수를 업데이트 해주는 API 호출 */
        // dispatch(callPatchBoardCountAPI(boardCode));
        navigate(`/board/${boardCode}`);
        
    }

    return (
        <motion.tr
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
            onClick={ () => clickBoardHandler(board.boardCode) }
        >
            <td>{board.boardCode}</td>
            <td>{board.boardType}</td>
            <td>{ board.boardTitle.length > 46 ? board.boardTitle.slice(0, 46) + '...' : board.boardTitle }</td>
            <td>{board.empName}</td>
            <td>{board.boardModifyDate ? board.boardModifyDate : board.boardWriteDate}</td>
            <td>{board.boardCount}</td>
        </motion.tr>
    );
}

export default BoardItem;