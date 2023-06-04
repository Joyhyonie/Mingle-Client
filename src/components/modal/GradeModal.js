import LectureCSS from "../../css/LectureInsertModal.module.css";
import GradeList from "../lists/GradeList";

function GradeModal ({setGradeModal}) {

    return (
        <div className={ LectureCSS.modal } onClick={ () => setGradeModal(false) }>
            <div className={ LectureCSS.gradeModalContainer } onClick={ (e) => e.stopPropagation() }>
                <div className={ LectureCSS.gradeHeader }> 
                    <div>
                        <sub>강의번호</sub>
                        <p>87585</p>
                    </div>
                    <div>
                        <sub>강의명</sub>
                        <p>자바의 방석</p>
                    </div>
                    <button>저장</button>
                </div>
                <div>
                    { <GradeList/> }
                </div>
            </div>
        </div>
    );
}

export default GradeModal;