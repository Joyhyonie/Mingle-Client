import { useEffect, useState } from "react";
import MainCSS from "../../css/Main.module.css"
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

function AcScheduleDetailModal ({setAcScheduleDetailModal}) {

    return (
        <div className={ MainCSS.modal } onClick={ () => setAcScheduleDetailModal(false)}>
            <div className={ MainCSS.acScheduleModalContainer } onClick={ (e) => e.stopPropagation() }>
                <div className={ MainCSS.title }>
                    2023학년도 1학기 강의 평가 실시
                </div>
                <div className={ MainCSS.info }>
                    <p><span>교무처 </span>차은우</p>
                    <text>2023.05.08 - 2023.05.12</text>
                </div>
                <div className={ MainCSS.content }>
                    <pre>
                        2023학년도 1학기 강의 평가 실시 <br/>
                        2023-1학기 강의 평가를 각 학과에서 실시합니다. <br/>
                        자세한 사항은 공지 게시판을 참고해주시길 바라며, <br/>
                        각 학과의 조교님들은 학생들에게 지도 부탁드립니다. <br/>
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default AcScheduleDetailModal;