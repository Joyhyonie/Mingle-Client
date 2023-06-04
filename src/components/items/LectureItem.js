import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import buttonCSS from "../../css/Button.module.css";
import LectureItemButtonCss from "../../css/LectureItemButton.module.css";
import { useState } from "react";
import GradeModal from "../modal/GradeModal";

function LectureItem({ lecture }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const index = 0;
    const [gradeModal, setGradeModal] = useState(false);
    const [selectedLecCode, setSelectedLecCode] = useState(0);
    const [selectedLecName, setSelectedLecName] = useState('');



    const clickBoardHandler = (lecture) => {   //lecture 랑 subject 가 들어옴 (dto에 있는 date)

        /* 해당 공지사항을 클릭 시, 조회수를 업데이트 해주는 API 호출 */
        // dispatch(callPatchBoardCountAPI(boardCode)); 버튼 두개 만들고 이벤트 여기다가 주고 버튼 css 주면 되겠다. 
        navigate(`/lectureplan/${lecture.lecCode}`); //강의 계획서 네이게이터


    }
    const clickBoardHandler2 = (lecture) => {


        navigate(`/lecture-student-admin/${lecture.lecCode}`); //출석


    }
    
    /* '성적' 버튼을 클릭 시, 실행되는 함수 */
    const clickGradeHandler = (lecture) => {
        setSelectedLecCode(lecture.lecCode); 
        setSelectedLecName(lecture.lecName);
        setGradeModal(true); 
    }

    return (


        <motion.tr
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
            onClick={() => clickBoardHandler(lecture)}
        >
            { gradeModal ? <GradeModal setGradeModal={setGradeModal} lecCode={selectedLecCode} lecName={selectedLecName} /> : null}

            <td>{lecture.lecCode}</td>
            <td>{lecture.lecName}</td>
            <td>{lecture.lecYear + '-' + lecture.lecSeason}</td>
            <td>{lecture.employee.empName}</td>
            <td>
                <button className={LectureItemButtonCss.button} type="button" onClick={(e) => { clickBoardHandler2(lecture); e.stopPropagation(); }}>출석</button>
                <button className={LectureItemButtonCss.button} type="button" onClick={(e) => { clickGradeHandler(lecture); e.stopPropagation(); }}>성적</button>
            </td>

        </motion.tr>
    );
}

export default LectureItem;