import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import LectureCSS from '../../css/ProfessorLecture.module.css';
import { useState } from "react";
import GradeModal from "../modal/GradeModal";

function LectureItem({ lecture }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const index = 0;
    const [gradeModal, setGradeModal] = useState(false);
    const [selectedLecCode, setSelectedLecCode] = useState(0);
    const [selectedLecName, setSelectedLecName] = useState('');

    const clickPlanHandler = (lecture) => {

        navigate(`/lectureplan/${lecture.lecCode}`); //강의 계획서 네이게이터

    }
    const clickAttendanceHandler = (lecture) => {

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
            onClick={() => clickPlanHandler(lecture)}
        >
            {gradeModal ? <GradeModal setGradeModal={setGradeModal} lecCode={selectedLecCode} lecName={selectedLecName} /> : null}

            <td>{lecture.lecCode}</td>
            <td>{lecture.lecName}</td>
            <td>{lecture.lecYear + '-' + lecture.lecSeason}</td>
            <td>{lecture.employee.empName}</td>
            <td>
                <button className={LectureCSS.button} type="button" onClick={(e) => { clickAttendanceHandler(lecture); e.stopPropagation(); }}>출석</button>
                <button className={LectureCSS.button} type="button" onClick={(e) => { clickGradeHandler(lecture); e.stopPropagation(); }}>성적</button>
            </td>

        </motion.tr>
    );
}

export default LectureItem;