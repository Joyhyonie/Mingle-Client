import { motion } from "framer-motion"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callStudentAttendanceGetAPI } from "../../apis/LectureAPICalls";
import { useState } from "react";


function GradeItem ({course, index}) {

    console.log("course => ", course);
    
    const dispatch = useDispatch();
    const { stdAttendance } = useSelector(state => state.SubjectInfoReducer);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [score3, setScore3] = useState(0);
    const [score4, setScore4] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [grade, setGrade] = useState('');

    useEffect(
        () => {
            dispatch(callStudentAttendanceGetAPI(course.courseCode))
        },[]
    );

    useEffect(() => {
        const total = score1 + score2 + score3 + score4;
        setTotalScore(total);
        calculateGrade(total);
    }, [score1, score2, score3, score4]);
    
    const calculateGrade = (total) => {
        if (total >= 96) {
          setGrade('A+');
        } else if (total >= 91) {
          setGrade('A-');
        } else if (total >= 86) {
          setGrade('B+');
        } else if (total >= 81) {
          setGrade('B-');
        } else if (total >= 76) {
          setGrade('C+');
        } else if (total >= 71) {
          setGrade('C-');
        } else if (total >= 66) {
          setGrade('D+');
        } else if (total >= 61) {
          setGrade('D-');
        } else {
          setGrade('F');
        }
    };
    

    return (
        <motion.tr>
            <td>{index}</td>
            <td>{course.student.department.deptName}</td>
            <td>{course.student.stdLevel}</td>
            <td>{course.student.stdCode}</td>
            <td>{course.student.stdName}</td>
            <td>{stdAttendance && stdAttendance.attendanceCount}</td>
            <td>{stdAttendance && stdAttendance.lateCount}</td>
            <td>{stdAttendance && stdAttendance.absenceCount}</td>
            <td><input type="text" value={score1} onChange={(e) => setScore1(Number(e.target.value))} /></td>
            <td><input type="text" value={score2} onChange={(e) => setScore2(Number(e.target.value))} /></td>
            <td><input type="text" value={score3} onChange={(e) => setScore3(Number(e.target.value))} /></td>
            <td><input type="text" value={score4} onChange={(e) => setScore4(Number(e.target.value))} /></td>
            <td>{totalScore}</td>
            <td>{grade}</td>
            <td></td>
        </motion.tr>
    );
}

export default GradeItem;