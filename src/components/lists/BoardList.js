import BoardCSS from '../../css/Board.module.css';
import { motion } from "framer-motion"
import BoardItem from '../items/BoardItem';

function BoardList ({boardList}) {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <table className={ BoardCSS.boardTable }>
                <colgroup>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="40%"/>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="10%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>분류</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(boardList)
                    && boardList.map(board => <BoardItem key={ board.boardCode } board={ board }/>) 
                    }
                </tbody>
            </table>
        </motion.div>
    );
}

export default BoardList;