import { useEffect, useState } from "react";
import MainCSS from "../../css/Main.module.css"
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

function RecordEndTimeModal ({setRecordEndTimeModal}) {

    const dispatch = useDispatch();

    /* 등록 성공 시 실행 될 useEffect */
    // useEffect(
    //     () => {
    //         if(recordEndTime?.status === 200) {
    //             toast.success("오늘의 퇴근 시각이 등록되었습니다");
    //             setRecordEndTimeModal(false);
    //         } 
    //     }, [recordEndTime]
    // );

    const timeNow = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours < 12 ? '오전' : '오후';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;
    } 

    const recordEndTimeHandler = () => {
        // 퇴근 시각을 등록하기 위한 API
        // dispatch(callEndTimeInsertAPI());

        // 임시용
        toast.success("오늘의 퇴근 시각이 등록되었습니다");
        setRecordEndTimeModal(false);
    }

    return (
        <div className={ MainCSS.modal } onClick={ () => setRecordEndTimeModal(false)}>
            <div className={ MainCSS.attendanceModalContainer } onClick={ (e) => e.stopPropagation() }>
                <p className={ MainCSS.timeNow }>{ timeNow() }</p>
                <p>오늘의 퇴근 시각을 등록하시겠습니까?</p>
                <div className={ MainCSS.centerButtonBox }>
                    <button className={ MainCSS.whiteButton } onClick={ () => setRecordEndTimeModal(false)}>
                        취소
                    </button>
                    <button className={ MainCSS.pinkButton } onClick={ recordEndTimeHandler }>
                        등록
                    </button>
                </div>
                <text>오늘도 고생 많으셨어요!</text>
            </div>
        </div>
    );

}

export default RecordEndTimeModal;