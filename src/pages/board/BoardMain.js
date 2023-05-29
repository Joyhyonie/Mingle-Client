import { motion } from "framer-motion"
import CommonCSS from '../../css/common/Common.module.css'
import SearchBarCss from '../../css/common/SearchBar.module.css';
import BoardCSS from '../../css/Board.module.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PagingBar from "../../components/common/PagingBar";
import BoardList from "../../components/lists/BoardList";
import SearchBar from "../../components/common/SearchBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { callBoardListAPI, callBoardSearchAPI } from "../../apis/BoardAPICalls";

function BoardMain() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardList, boardSearch } = useSelector(state => state.BoardReducer);
  const [searchParams] = useSearchParams();
  const [boardType, setBoardType] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);

  const condition = searchParams.get('condition');
  const word = searchParams.get('word');

  useEffect(() => {
    // boardType이 초기값인 '전체'이면서 검색기준이 존재하지 않을 때는 모든 공지사항 조회
    if (boardType === '전체' && !condition && !word) {
      dispatch(callBoardListAPI({ currentPage }));
    } else {
      dispatch(callBoardSearchAPI({ currentPage, boardType, condition, word }));
    }
  }, [currentPage, boardType, condition, word]);

  const options = [
    { value: "title", label: "제목" },
    { value: "content", label: "내용" },
    { value: "writer", label: "작성자" }
  ];

  const clikedStyle = {
    background: '#343434',
    border: '1px solid #343434',
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <button
        className={BoardCSS.goToRegistButton}
        onClick={() => navigate('/board/regist')}
      >
        공지 등록
      </button>
      <p className={CommonCSS.pageDirection}>공지사항</p>
      <div className={SearchBarCss.basic}>
        {<SearchBar
          options={options} type="board">
        </SearchBar>}
      </div>
      <div className={BoardCSS.boardButtonBox}>
        <button
          style={boardType === '전체' ? clikedStyle : null}
          onClick={(e) => { setBoardType(e.target.textContent); }}
        >
          전체
        </button>
        <button
          style={boardType === '학사' ? clikedStyle : null}
          onClick={(e) => { setBoardType(e.target.textContent); }}
        >
          학사
        </button>
        <button
          style={boardType === '장학' ? clikedStyle : null}
          onClick={(e) => { setBoardType(e.target.textContent); }}
        >
          장학
        </button>
        <button
          style={boardType === '행사' ? clikedStyle : null}
          onClick={(e) => { setBoardType(e.target.textContent); }}
        >
          행사
        </button>
        <button
          style={boardType === '취업' ? clikedStyle : null}
          onClick={(e) => { setBoardType(e.target.textContent); }}
        >
          취업
        </button>
        <button
          style={boardType === '기타' ? clikedStyle : null}
          onClick={(e) => { setBoardType(e.target.textContent); }}
        >
          기타
        </button>
      </div>
      <div>
      {(boardSearch && boardSearch.data) ? <BoardList boardList={boardSearch.data} /> : (boardList && boardList.data) ? <BoardList boardList={boardList.data} /> : null}
      </div>
      <div>
      {(boardSearch && boardSearch.data) ? <PagingBar pageInfo={boardSearch.pageInfo} setCurrentPage={setCurrentPage} /> : (boardList && boardList.data) ? <PagingBar pageInfo={boardList.pageInfo} setCurrentPage={setCurrentPage} /> : null}
      </div>
    </motion.div>
  );
}

export default BoardMain;