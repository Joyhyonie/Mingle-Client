import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CommonCSS from '../../css/common/Common.module.css'
import BoardCSS from '../../css/Board.module.css';
import { useEffect, useState } from "react";
import BoardDeleteModal from "../../components/modal/BoardDeleteModal";
import { callBoardDetailAPI } from "../../apis/BoardAPICalls";
import dayjs from "dayjs";
import React from 'react';
import { toast } from "react-hot-toast";

function BoardDetail () {

    const dispatch = useDispatch();
    const params = useParams();
    const boardCode = params.boardCode;
    const navigate = useNavigate();
    const { employee } = useSelector(state => state.EmployeeReducer);
    const { board, remove, countUp } = useSelector(state => state.BoardReducer);
    const [boardDeleteModal, setBoardDeleteModal] = useState(false);
    
    useEffect(
        () => {
            dispatch(callBoardDetailAPI(boardCode));
        },[countUp] // 클릭하여 상세 내용 조회 시, 즉시 증가한 조회수를 노출하기 위한 렌더링
    );

    useEffect(
        () => {
            if(remove?.status === 200) {
                toast.success("공지가 성공적으로 삭제되었습니다 :)")
                navigate('/board', { replace : true });
            }
        }, [remove]
    );

    const formatDate = (date) => {
        return dayjs(date).format('YYYY-MM-DD');
    };

    /* 현재 로그인한 유저가 해당 게시물의 작성자인지 확인후 수정&삭제 버튼 렌더링 */
    const isWriter = employee && board && board.writer && employee.empCode === board.writer.empCode;

    return (
        <>
            { board && <>
                <div>
                    { boardDeleteModal ?
                        <BoardDeleteModal setBoardDeleteModal={setBoardDeleteModal} boardCode={boardCode}/> : null
                    }
                </div>
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
                >
                    <p className={ CommonCSS.pageDirection }>공지사항 ▸ 공지 상세 내용</p>
                    <div className={ BoardCSS.buttonBox }>
                        <button 
                            className={ BoardCSS.whiteButton }
                            onClick={ () => navigate(-1) }
                        >
                            이전으로
                        </button>
                        { isWriter &&
                            <>
                            <button 
                                className={ BoardCSS.pinkButton }
                                onClick={ () => navigate(`/board/${boardCode}/modify`) }
                            >
                                수정
                            </button>
                            <button 
                                className={ BoardCSS.pinkButton }
                                onClick={ () => setBoardDeleteModal(true) }
                            >
                                삭제
                            </button>
                            </>
                        }
                    </div>
                    <div className={ BoardCSS.titleBox }>
                        {board.boardTitle}
                    </div>
                    <div className={ BoardCSS.boardInfoBox }>
                        <p><span>{board.writer.department.deptName} </span>{board.writer.empName}</p>
                        <div>
                            <p><span>{board.boardModifyDate ? '수정일 ' : '등록일 '}</span>{formatDate(board.boardModifyDate ? board.boardModifyDate : board.boardWriteDate)}</p>
                            <p><span>조회수 </span>{board.boardCount}</p>
                        </div>
                    </div>
                    <div className={ BoardCSS.detailContentBox }>
                        <div className={ BoardCSS.boardContent }>
                        {/* 타임리프의 th:utext와 같이 html 태그를 그대로 보여주는 기능 (동적으로 엘리먼트 생성) */}
                        {React.createElement("div", { dangerouslySetInnerHTML: { __html: board.boardContent } })}
                        </div>
                    </div>

                </motion.div>
            </> }
        </>
    );
}

export default BoardDetail;