import { useDispatch, useSelector } from "react-redux";
import MainCSS from "../../css/Main.module.css"
import { useEffect } from "react";
import { callBoardPreviewAPI } from "../../apis/BoardAPICalls";
import { useNavigate } from "react-router-dom";

function BoardPreview () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { boardPreview } = useSelector(state => state.BoardReducer);

    useEffect(
        () => {
            /* 공지사항 조회 API */
            dispatch(callBoardPreviewAPI())
        },[]
    );

    /* 문자열 포맷 함수 */
    const formatDate = (WriteDate) => {
        const date = new Date(WriteDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}`;
    }

    return (
        <div className={ MainCSS.boardBox }>
            <div className={ MainCSS.boardTitleBox }>
                <p>공지사항</p>
            </div>
            <div className={ MainCSS.boardListBox }>
                { boardPreview && boardPreview.map( board => (
                    <div 
                        key={board.boardCode}
                        className={ MainCSS.boardItemBox }
                        onClick={ () => navigate(`/board/${board.boardCode}`) }
                    >
                        <p>{board.boardCode}</p>
                        <p style={{fontWeight:'bold'}}>{board.boardType}</p>
                        <p
                            className={ MainCSS.boardTitle }
                        >
                            { board.boardTitle.length > 17 ? board.boardTitle.slice(0, 17) + '...' : board.boardTitle }
                        </p>
                        <p>{formatDate(board.boardWriteDate)}</p>
                    </div>
                ))
                }
                
            </div>
        </div>
    );
}

export default BoardPreview;