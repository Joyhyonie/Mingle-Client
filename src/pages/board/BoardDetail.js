import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CommonCSS from '../../css/common/Common.module.css'
import BoardCSS from '../../css/Board.module.css';

function BoardDetail () {

    const dispatch = useDispatch();
    const params = useParams();
    const boardCode = params.boardCode;
    const navigate = useNavigate();

    /* (임시용) 현재 로그인한 유저가 해당 게시물의 작성자인지 확인후 수정&삭제 버튼 렌더링 */
    const isWriter = true;

    /* '삭제' 클릭 시, 삭제 모달 띄우는 이벤트 함수 */
    const deleteModalHandler = () => {

    }

    return (
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
                        onClick={ deleteModalHandler }
                    >
                        삭제
                    </button>
                    </>
                }
            </div>
            <div className={ BoardCSS.titleBox }>
                [봉사활동] 지구를 위한 플로깅, 쓰담달리기 자원봉사자 모집 {/* board.boardTitle */}
            </div>
            <div className={ BoardCSS.boardInfoBox }>
                <p><span>교무처 </span>차은우</p> {/* board.writer.department.deptName & board.writer.empName */}
                <div>
                    <p>등록일 2023-05-04</p>   {/* board.boardModifyDate ? '수정일' : '등록일' */} {/* board.boardModifyDate ? board.boardModifyDate : board.boardWriteDate */}
                    <p>조회수 213</p> {/* board.boardCount */}
                </div>
            </div>
            <div className={ BoardCSS.detailContentBox }>
                <div className={ BoardCSS.boardContent }>
                    <img src={`${process.env.PUBLIC_URL}/images/dummy.jpg`}/>
                </div>
            </div>

        </motion.div>
    );
}

export default BoardDetail;