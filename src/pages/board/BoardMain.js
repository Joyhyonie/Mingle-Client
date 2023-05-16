import { motion } from "framer-motion"
import CommonCSS from '../../css/common/Common.module.css'
import SearchAndListLayout from '../../layouts/SearchAndListLayout';
import SearchBarCSS from '../../css/common/SearchBar.module.css';
import BoardCSS from '../../css/Board.module.css';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PagingBar from "../../components/common/PagingBar";
import BoardList from "../../components/lists/BoardList";

function BoardMain () {

    /* (임시용 데이터) */
    const boardList = [{boardCode: 20001, boardType: '학사', boardTitle: '[공지사항] 땡땡땡', boardContent: '우왕앙', boardWriteDate: '2023-05-16', boardCount: 109, empCode:12345, empName: '허멈머', boardModifyDate: '2023-05-19'},
                       {boardCode: 20002, boardType: '장학', boardTitle: '[공지사항] 장학금지원~', boardContent: '우왕앙', boardWriteDate: '2023-05-14', boardCount: 203, empCode:12346, empName: '허꼬순', boardModifyDate: null}
                      ]
    const pageInfo = {startPage: 1, endPage: 10, currentPage: 1, maxPage: 10}

    const dispatch = useDispatch();
    const [boardType, setBoardType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const options = [
        { value: "title", name: "제목" },
        { value: "content", name: "내용" }
    ];

    useEffect(
        () => {
            if(boardType) {
                // boardType에 따른 공지사항 조회 API
                // dispatch(callGetBoardListByTypeAPI(boardType))
            } 



        },[boardType]
    );

    const clikedStyle ={
        background:'#FF9797', 
        color:'white', 
        fontWeight: 'bold'
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <p className={ CommonCSS.pageDirection }>공지사항</p>
            <div className={ SearchBarCSS.basic }>
                <SearchAndListLayout options={options}/>
            </div>
            <div className={ BoardCSS.boardButtonBox }>
                <button 
                    style={ boardType === ''? clikedStyle : null}
                    onClick={ (e) => {setBoardType('');} }
                >
                    전체
                </button>
                <button 
                    style={ boardType === '학사'? clikedStyle : null}
                    onClick={ (e) => {setBoardType(e.target.textContent);} }
                >
                    학사
                </button>
                <button 
                    style={ boardType === '장학'? clikedStyle : null}
                    onClick={ (e) => {setBoardType(e.target.textContent);} }
                >
                    장학
                </button>
                <button 
                    style={ boardType === '행사'? clikedStyle : null}
                    onClick={ (e) => {setBoardType(e.target.textContent);} }
                >
                    행사
                </button>
                <button 
                    style={ boardType === '취업'? clikedStyle : null}
                    onClick={ (e) => {setBoardType(e.target.textContent);} }
                >
                    취업
                </button>
                <button 
                    style={ boardType === '기타'? clikedStyle : null}
                    onClick={ (e) => {setBoardType(e.target.textContent);} }
                >
                    기타
                </button>
            </div>
            <div>
                { boardList && <BoardList boardList={ boardList }/> }
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }
            </div>
        </motion.div>
    );
}

export default BoardMain;