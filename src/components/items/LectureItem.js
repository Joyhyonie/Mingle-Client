import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import buttonCSS from "../../css/Button.module.css";

function LectureItem({ lecture }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const index = 0;

    const clickBoardHandler = (lecture) => {

        /* 해당 공지사항을 클릭 시, 조회수를 업데이트 해주는 API 호출 */
        // dispatch(callPatchBoardCountAPI(boardCode)); 버튼 두개 만들고 이벤트 여기다가 주고 버튼 css 주면 되겠다. 
        navigate(`/lectureplan/${lecture.lecCode}`); //강의 계획서 네이게이터


    }
    const clickBoardHandler2 = (lecture) => {


        navigate(`/attendance/${lecture.lecCode}`); //출석


    }
    const clickBoardHandler3 = (lecture) => {


        navigate(`/score/${lecture.lecCode}`); //성적


    }
    console.log("LectureItem에서 확인하고 싶다.", lecture);
    return (
        <motion.tr
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
            onClick={() => clickBoardHandler(lecture)}
        >


            <td>{lecture.lecCode}</td>
            <td>{lecture.subject.sbjName}</td>
            <td>{lecture.lecYear + '-' + lecture.lecSeason}</td>
            <td>{lecture.employee.empName}</td>
            <td>
                <button className={buttonCSS.btn} type="button" onClick={(e) => { clickBoardHandler2(lecture); e.stopPropagation(); }}>출석</button>
                <button className={buttonCSS.btn} type="button" onClick={(e) => { clickBoardHandler3(lecture); e.stopPropagation(); }}>성적</button>
            </td>

        </motion.tr>
    );
}

export default LectureItem;