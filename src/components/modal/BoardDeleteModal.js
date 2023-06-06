import BoardCSS from '../../css/Board.module.css';
import { useDispatch, useSelector } from "react-redux";
import { callBoardRemoveAPI } from "../../apis/BoardAPICalls";

function BoardDeleteModal ({setBoardDeleteModal, boardCode}) {

    const dispatch = useDispatch();

    /* '삭제' 클릭 시, 해당 공지를 삭제하는 API 호출 */
    const deleteBoardHandler = () => {
        dispatch(callBoardRemoveAPI(boardCode));
    }

    return (
        <div className={ BoardCSS.deleteModal } onClick={ () => setBoardDeleteModal(false) }>
            <div className={ BoardCSS.modalContainer } onClick={ (e) => e.stopPropagation() }>
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