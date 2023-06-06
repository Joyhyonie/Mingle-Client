import { useEffect, useState } from "react";
import MainCSS from "../../css/Main.module.css"
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { callMyScheduleModifyAPI, callMyScheduleRemoveAPI } from "../../apis/ScheduleAPICalls";


function ModifyScheduleModal ({selectedSchedule, setModifyScheduleModal}) {

    const dispatch = useDispatch();
    const { modifyMySche, removeMySche } = useSelector(state => state.ScheduleReducer);
    const [form, setForm] = useState({ // 입력된 값을 초기값으로 지정하여 수정된 사항이 없는 항목은 그대로 다시 insert 되도록 함
        scheName: selectedSchedule.scheName,
        scheStartDate: selectedSchedule.scheStartDate,
        scheEndDate: selectedSchedule.scheEndDate,
        colorCode: selectedSchedule.colorCode
    });

    /* 수정/삭제 성공 시 실행 될 useEffect */
    useEffect(
        () => {
            if(modifyMySche?.status === 200) {
                toast.success("일정이 수정되었습니다 :)");
                setModifyScheduleModal(false);
            } else if(removeMySche?.status === 200) {
                toast.success("일정이 삭제되었습니다 :)");
                setModifyScheduleModal(false);
            }
        }, [modifyMySche, removeMySche]
    );

    /* 시작일/종료일을 기본값으로 노출 시키기 위한 날짜 포맷 함수 */
    const formatDate = (scheDate) => {
        const date = new Date(scheDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /* 입력된 input 요소들을 한번에 처리할 이벤트 함수 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 나의 일정을 수정하는 이벤트 함수 */
    const modifyMySchedule = (scheCode) => {

        // 변동 사항이 있고, 정확한 값들이 입력되었는지 검증하는 로직
        if (form.scheName === selectedSchedule.scheName && 
            form.scheStartDate === selectedSchedule.scheStartDate && 
            form.scheEndDate === selectedSchedule.scheEndDate &&
            form.colorCode === selectedSchedule.colorCode) {
            toast.error("수정된 항목이 없습니다 !");
        } else if(form.scheName === undefined || form.scheName === ''){
            toast.error("일정명을 입력해주세요 !");
        } else if(form.scheEndDate < form.scheStartDate) {
            toast.error("종료일은 시작일보다 이후의 날짜여야합니다 !")
        } else {

            // FormData 객체 설정
            const formData = new FormData();
            formData.append("scheCode", scheCode);
            formData.append("scheName", form.scheName);
            formData.append("scheStartDate", form.scheStartDate);
            formData.append("scheEndDate", form.scheEndDate);
            formData.append("colorCode", form.colorCode);

            dispatch(callMyScheduleModifyAPI(formData));
        }

    }

    /* 나의 일정을 삭제하는 이벤트 함수 */
    const deleteMySchedule = (scheCode) => {

        dispatch(callMyScheduleRemoveAPI(scheCode));

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
                        defaultValue={selectedSchedule.scheName}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <p>날짜</p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input 
                        type="date"
                        name="scheStartDate"
                        defaultValue={formatDate(selectedSchedule.scheStartDate)}
                        onChange={onChangeHandler}
                    />
                    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                    <input 
                        type="date"
                        name="scheEndDate"
                        defaultValue={formatDate(selectedSchedule.scheEndDate)}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <p>색상</p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input
                        type="color"
                        name="colorCode"
                        defaultValue={selectedSchedule.colorCode}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={ MainCSS.buttonBox }>
                    <button className={ MainCSS.whiteButton } onClick={ () => setModifyScheduleModal(false)}>
                        취소
                    </button>
                    <button className={ MainCSS.blackButton } onClick={ () => modifyMySchedule(selectedSchedule.scheCode) }>
                        수정
                    </button>
                    <button className={ MainCSS.blackButton } onClick={ () => deleteMySchedule(selectedSchedule.scheCode) }>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModifyScheduleModal;