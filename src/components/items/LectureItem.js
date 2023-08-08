import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import LectureCSS from '../../css/ProfessorLecture.module.css';
import { useState } from "react";
import GradeModal from "../modal/GradeModal";
import LecPlanModal from "../modal/LecPlanModal";

function LectureItem({ lecture, index }) {

    const navigate = useNavigate();
    const [gradeModal, setGradeModal] = useState(false);
    const [selectedLecCode, setSelectedLecCode] = useState(0);
    const [selectedLecName, setSelectedLecName] = useState('');

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
        >
            {gradeModal ? <GradeModal setGradeModal={setGradeModal} lecCode={selectedLecCode} lecName={selectedLecName} /> : null}

            <td>{index}</td>
            <td>{lecture.lecCode}</td>
            <td>{lecture.subject.sbjName}</td>
            <td>{lecture.lecName}</td>
            <td>{lecture.lecYear + '-' + lecture.lecSeason}</td>
            <td>{lecture.employee.empName}</td>
            <td><button className={LectureCSS.button} type="button" onClick={(e) => { clickAttendanceHandler(lecture); e.stopPropagation(); }}>출석</button></td>
            <td><button className={LectureCSS.button} type="button" onClick={(e) => { clickGradeHandler(lecture); e.stopPropagation(); }}>성적</button></td>

        </motion.tr>
    );
}

export default LectureItem;