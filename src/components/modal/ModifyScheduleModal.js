import { useEffect, useState } from "react";
import MainCSS from "../../css/Main.module.css"
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";


function ModifyScheduleModal ({schedules, setModifyScheduleModal}) {

    const dispatch = useDispatch();
    const [form, setForm] = useState({ // 입력된 값을 초기값으로 지정하여 수정된 사항이 없는 항목은 그대로 다시 insert 되도록 함
        scheName: schedules.scheName,
        scheStartDate: schedules.scheStartDate,
        scheEndDate: schedules.scheEndDate,
        colorCode: schedules.colorCode
    });

    /* 등록 성공 시 실행 될 useEffect */
    // useEffect(
    //     () => {
    //         if(modify?.status === 200) {
    //             toast.success("일정이 등록되었습니다");
    //             setAddScheduleModal(false);
    //         } else if(remove?.status === 200) {
    //             toast.success("일정이 삭제되었습니다");
    //             setAddScheduleModal(false);
    //         }
    //     }, [modify, remove]
    // );

    /* 입력된 input 요소들을 한번에 처리할 이벤트 함수 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 나의 일정을 수정하는 이벤트 함수 */
    const modifyMySchedule = (e) => {

        console.log(form.scheName);
        console.log(form.scheStartDate);
        console.log(form.scheEndDate);
        console.log(form.colorCode);

        // 변동 사항이 있고, 정확한 값들이 입력되었는지 검증하는 로직
        if (form.scheName === schedules.scheName && 
            form.scheStartDate === schedules.scheStartDate && 
            form.scheEndDate === schedules.scheEndDate &&
            form.colorCode === schedules.colorCode) {
            toast.error("수정된 항목이 없습니다 !");
        } else if(form.scheName === undefined || form.scheName === ''){
            toast.error("일정명을 입력해주세요 !");
        } else if(form.scheEndDate < form.scheStartDate) {
            toast.error("종료일은 시작일보다 이후의 날짜여야합니다 !")
        } else {

            // FormData 객체 설정
            const formData = new FormData();
            formData.append("scheName", form.scheName);
            formData.append("scheStartDate", form.scheStartDate);
            formData.append("scheEndDate", form.scheEndDate);
            formData.append("colorCode", form.colorCode);

            // dispatch(callModifyMyScheduleAPI(formData));

            // (임시용)
            toast.success("일정이 수정되었습니다");
            setModifyScheduleModal(false);
        }

    }

    /* 나의 일정을 삭제하는 이벤트 함수 */
    const deleteMySchedule = () => {

        // dispatch(callDeleteMyScheduleAPI(schedules.scheCode))

        // (임시용)
        toast.success("일정이 삭제되었습니다");
        setModifyScheduleModal(false);
    }

    return (
        <div className={ MainCSS.modal } onClick={ () => setModifyScheduleModal(false)}>
            <div className={ MainCSS.scheduleModalContainer } onClick={ (e) => e.stopPropagation() }>
                <div>
                    <p>일정명</p>
                    <input 
                        type="text" 
                        name="scheName"
                        maxLength={22}
                        defaultValue={schedules.scheName}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <p>날짜</p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input 
                        type="date"
                        name="scheStartDate"
                        defaultValue={schedules.scheStartDate}
                        onChange={onChangeHandler}
                    />
                    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                    <input 
                        type="date"
                        name="scheEndDate"
                        defaultValue={schedules.scheEndDate}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <p>색상</p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input
                        type="color"
                        name="colorCode"
                        defaultValue={schedules.colorCode}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={ MainCSS.buttonBox }>
                    <button className={ MainCSS.whiteButton } onClick={ () => setModifyScheduleModal(false)}>
                        취소
                    </button>
                    <button className={ MainCSS.pinkButton } onClick={ modifyMySchedule }>
                        수정
                    </button>
                    <button className={ MainCSS.pinkButton } onClick={ deleteMySchedule }>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModifyScheduleModal;