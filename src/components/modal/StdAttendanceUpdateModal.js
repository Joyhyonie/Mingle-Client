import SubjectUpdateModalCSS from "../../css/StdAttendanceUpdateModal.module.css";
import { callAttendanceModifyAPI } from "../../apis/LectureAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { initModify } from '../../modules/LectureModule';

function StdAttendanceUpdateModal({ subject, setIsModalOpen }) {


    const dispatch = useDispatch();

    const [form, setForm] = useState(subject);
    const { modify } = useSelector(state => state.SubjectInfoReducer);
    console.log(subject);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickSubjectUpdateHandler = () => {

        if (!form.stdAtdStatus) {

            toast.error("출석 정보를 입력해주세요.")
        }

        const formData = new FormData();
        const stdAtdCode = form.stdAtdCode;
        formData.append("stdAtdStatus", form.stdAtdStatus);

        console.log("form.stdAtdStatus", form.stdAtdStatus)

        dispatch(callAttendanceModifyAPI(formData, { stdAtdCode }));


    };

    useEffect(
        () => {
            console.log("modify", modify);
            if (modify?.status === 200) {
                toast.success("출석 수정이 완료 되었습니다.");
                setIsModalOpen(false);
                dispatch(initModify());
            }
        }, [modify]
    );


    return (
        <div className={SubjectUpdateModalCSS.modal}>
            <div className={SubjectUpdateModalCSS.modalContainer}>
                <div className={SubjectUpdateModalCSS.SubjectModalDiv}>
                    <div className={SubjectUpdateModalCSS.stdAttendanceAllName}>
                        <div className={SubjectUpdateModalCSS.stdAttendanceName1}>
                            <label className={SubjectUpdateModalCSS.stdAttendanceName2}>성명:</label>
                            <input
                                className={SubjectUpdateModalCSS.stdAttendanceName3}
                                readOnly
                                value={subject.course.student.stdName}
                            />
                        </div>

                        <div className={SubjectUpdateModalCSS.stdAttendanceName1}>
                            <label className={SubjectUpdateModalCSS.stdAttendanceName2}>학번:
                            </label>
                            <input
                                className={SubjectUpdateModalCSS.stdAttendanceName3}
                                readOnly
                                value={subject.course.student.stdCode}
                            />

                        </div>
                    </div>
                    <label className={SubjectUpdateModalCSS.label}>출석입력</label>
                    <select className={SubjectUpdateModalCSS.deptCode} name="stdAtdStatus" onChange={onChangeHandler}>

                        <option value="출석">출석</option>
                        <option value="지각">지각</option>
                        <option value="결석">결석</option>

                    </select>
                    <button onClick={onClickSubjectUpdateHandler}>수정</button>
                    <button onClick={() => setIsModalOpen(false)}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default StdAttendanceUpdateModal;