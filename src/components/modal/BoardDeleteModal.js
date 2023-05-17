import { motion } from "framer-motion"
import BoardCSS from '../../css/Board.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BoardDeleteModal ({setBoardDeleteModal, boardCode}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { delete } = useSelector(state => state.boardReducer); // 미래의 나를 위한 코드 ^^

    // useEffect(
    //     () => {
    //         if(delete?.status === 200) {
    //             toast.success("공지가 성공적으로 삭제되었습니다")
    //             navigate('/board', { replace : true });
    //         }
    //     }, [delete]
    // );


    /* '삭제' 클릭 시, 해당 공지를 삭제하는 API 호출 */
    const deleteBoardHandler = () => {
        // dispatch(callDeleteBoardAPI(boardCode));

        // (임시용)
        toast.success("공지가 성공적으로 삭제되었습니다")
        navigate('/board', { replace : true });
    }

    return (
        <div className={ BoardCSS.deleteModal }>
            <div className={ BoardCSS.modalContainer }>
                <p>삭제 된 공지는 복구할 수 없습니다.<br/>계속 진행하시겠습니까?</p>
                <div className={ BoardCSS.deleteButtonBox }>
                    <button
                        className={ BoardCSS.pinkButton }
                        onClick={ deleteBoardHandler }
                    >
                            삭제
                    </button>
                    <button
                        className={ BoardCSS.whiteButton }
                        onClick={ () => setBoardDeleteModal(false) }
                    >
                            취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BoardDeleteModal;