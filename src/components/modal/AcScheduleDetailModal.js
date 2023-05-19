import { useEffect, useState } from "react";
import MainCSS from "../../css/Main.module.css"
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

function AcScheduleDetailModal ({setAcScheduleDetailModal, selectedSchedule}) {

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' }).replace(/\./g, '.');
    }

    return (
        <div className={ MainCSS.modal } onClick={ () => setAcScheduleDetailModal(false)}>
            <div className={ MainCSS.acScheduleModalContainer } onClick={ (e) => e.stopPropagation() }>
                <div className={ MainCSS.title }>
                    {selectedSchedule.scheName}
                </div>
                <div className={ MainCSS.info }>
                    <p><span>{selectedSchedule.employee.department.deptName} </span>{selectedSchedule.employee.empName}</p>
                    <text>{formatDate(selectedSchedule.scheStartDate)} {'- '}
                          {formatDate(selectedSchedule.scheEndDate)}</text>
                </div>
                <div className={ MainCSS.content }>
                    <pre>
                        {selectedSchedule.scheContent}
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default AcScheduleDetailModal;