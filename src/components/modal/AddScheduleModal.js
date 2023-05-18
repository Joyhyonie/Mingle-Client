import { useEffect, useState } from "react";
import MainCSS from "../../css/Main.module.css"
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

function AddScheduleModal ({setAddScheduleModal}) {

    const dispatch = useDispatch();
    const [form, setForm] = useState({});

    /* 등록 성공 시 실행 될 useEffect */
    // useEffect(
    //     () => {
    //         if(regist?.status === 200) {
    //             toast.success("일정이 등록되었습니다");
    //             setAddScheduleModal(false);
    //         }
    //     }, [regist]
    // );

    /* 입력된 input 요소들을 한번에 처리할 이벤트 함수 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 나의 일정을 등록하는 이벤트 함수 */
    const registMySchedule = (e) => {

        // 정확한 값들이 입력되었는지 검증하는 로직
        if(form.scheName === undefined || form.scheName === ''){
            toast.error("일정명을 입력해주세요 !")
        } else if(form.scheStartDate === undefined) {
            toast.error("시작일을 선택해주세요!")
        } else if(form.scheEndDate === undefined) {
            toast.error("종료일을 선택해주세요 !")
        } else if(form.scheEndDate < form.scheStartDate) {
            toast.error("종료일은 시작일보다 이후의 날짜여야합니다 !")
        } else {

            // FormData 객체 설정
            const formData = new FormData();
            formData.append("scheName", form.scheName);
            formData.append("scheStartDate", form.scheStartDate);
            formData.append("scheEndDate", form.scheEndDate);
            formData.append("colorCode", form.colorCode);

            // dispatch(callRegistMyScheduleAPI(formData));

            // (임시용)
            toast.success("일정이 등록되었습니다");
            setAddScheduleModal(false);
        }

    }

    return (
        <div className={ MainCSS.modal } onClick={ () => setAddScheduleModal(false)}>
            <div className={ MainCSS.scheduleModalContainer } onClick={ (e) => e.stopPropagation() }>
                <div>
                    <p>일정명</p>
                    <input 
                        type="text" 
                        name="scheName"
                        maxLength={22}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <p>날짜</p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input 
                        type="date"
                        name="scheStartDate"
                        onChange={onChangeHandler}
                    />
                    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                    <input 
                        type="date"
                        name="scheEndDate"
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <p>색상</p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input
                        type="color"
                        name="colorCode"
                        defaultValue={"#FFD7D7"}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={ MainCSS.buttonBox }>
                    <button className={ MainCSS.whiteButton } onClick={ () => setAddScheduleModal(false)}>
                        취소
                    </button>
                    <button className={ MainCSS.pinkButton } onClick={ registMySchedule }>
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddScheduleModal;