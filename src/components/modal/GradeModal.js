import { useEffect } from "react";
import LectureCSS from "../../css/LectureInsertModal.module.css";
import GradeList from "../lists/GradeList";
import { useDispatch, useSelector } from "react-redux";
import { callCourceStdListAPI } from "../../apis/LectureAPICalls";

function GradeModal ({setGradeModal, lecCode, lecName}) {

    const dispatch = useDispatch();
    const { attendance } = useSelector(state => state.SubjectInfoReducer);

    useEffect(
        () => {
            dispatch(callCourceStdListAPI({lecCode}))
        },[]
    );

    return (
        <div className={ LectureCSS.modal } onClick={ () => setGradeModal(false) }>
            <div className={ LectureCSS.gradeModalContainer } onClick={ (e) => e.stopPropagation() }>
                <div className={ LectureCSS.gradeHeader }> 
                    <div>
                        <sub>강의번호</sub>
                        <p>{lecCode}</p>
                    </div>
                    <div>
                        <sub>강의명</sub>
                        <p>{lecName}</p>
                    </div>
                    <button>저장</button>
                </div>
                <div>
                    { <GradeList courseList={ attendance && attendance.courseStudentList }/> }
                </div>
            </div>
        </div>
    );
}

export default GradeModal;