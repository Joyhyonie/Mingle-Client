import { useEffect, useState } from "react";
import MainCSS from "../../css/Main.module.css"
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { callEndTimeRecordAPI, callStartTimeRecordAPI } from "../../apis/AttendanceAPICalls";

function RecordStartTimeModal ({setRecordStartTimeModal}) {

    const dispatch = useDispatch();
    const { recordStartTime } = useSelector(state => state.AttendanceReducer);

    /* 등록 성공 시 실행 될 useEffect */
    useEffect(
        () => {
            if(recordStartTime?.status === 200) {
                toast.success("오늘의 출근 시각이 등록되었습니다 :)");
                setRecordStartTimeModal(false);
            } 
        }, [recordStartTime]
    );

    const timeNow = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours < 12 ? '오전' : '오후';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;
    } 

    const recordStartTimeHandler = () => {
        // 출근 시각을 등록하기 위한 API 호출
        dispatch(callStartTimeRecordAPI());
    }

    return (
        <div className={ MainCSS.modal } onClick={ () => setRecordStartTimeModal(false)}>
            <div className={ MainCSS.attendanceModalContainer } onClick={ (e) => e.stopPropagation() }>
                <p className={ MainCSS.timeNow }>{ timeNow() }</p>
                <p>오늘의 출근 시각을 등록하시겠습니까?</p>
                <div className={ MainCSS.centerButtonBox }>
                    <button className={ MainCSS.whiteButton } onClick={ () => setRecordStartTimeModal(false)}>
                        취소
                    </button>
                    <button className={ MainCSS.blackButton } onClick={ recordStartTimeHandler }>
                        등록
                    </button>
                </div>
                <text>MINGLE과 함께 힘찬 하루 보내세요!</text>
            </div>
        </div>
    );
}

export default RecordStartTimeModal;