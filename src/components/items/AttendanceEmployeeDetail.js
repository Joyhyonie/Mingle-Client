import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callEmployeeDetail, updateAttendanceAPI } from "../../apis/AttendanceAPICalls";
import ApplideCertidocCSS from '../../css/ApplyCertiDoc.module.css';
import CommonCSS from "../../css/common/Common.module.css";
import PagingBar from "../common/PagingBar";
import { toast } from "react-hot-toast";

function AttendanceEmployeeDetail(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {data , pageInfo} = useSelector(state => state.AttendanceReducer);
    const [form, setForm] = useState({});
    const {adminpatch} = useSelector(state => state.AttendanceReducer);
    const navigate = useNavigate();
    const params = useParams();
    console.log(data);
    console.log(params.empCode);
    const empCode = params.empCode;

    useEffect(
        ()=>{
            dispatch(callEmployeeDetail({currentPage,empCode}));
        },
        [empCode,adminpatch]
    )
    const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const onClickHandler = (atdCode) => {
        const formData = new FormData();

        formData.append("atdStatus",form.atdStatus);
        formData.append("atdEtc", form.atdEtc);

        dispatch(updateAttendanceAPI(atdCode,formData))
    }

    useEffect(
        ()=>{
            if(adminpatch?.status ===200){
                toast.success("수정이 완료되었습니다.");
                navigate(-1);
            }
        },
        [adminpatch]
    )

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >  
            <div>
                {data && 
                data.map((attendance) => (
                <p className={ CommonCSS.pageDirection }>근태관리 ▸ 교직원 근태 기록 ▸ {attendance.employee.empName}</p>
                ))}
            </div>
             <div className={ApplideCertidocCSS.ApplyCertiDocCSS}>
                <table className={ApplideCertidocCSS.ApplyTable}>
                    <colgroup>
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />                   
                    <col width="10%" />     
                    </colgroup>
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>출근</th>
                            <th>퇴근</th>
                            <th>상태</th>
                            <th>비고</th>    
                            <th></th>                      
                        </tr>
                    </thead>
                    <tbody>
                {data && 
                    data.map((attendance) => (
                    <tr key={attendance.atdCode}>
                    <td>{attendance.atdDate}</td>
                    <td>{attendance.atdStartTime}</td>
                    <td>{attendance.atdEndTime ? attendance.atdEndTime : "X"}</td>
                    <td><input type="text" placeholder={attendance.atdStatus} name="atdStatus" onChange={onChangeHandler} className={ApplideCertidocCSS.inputAtdEtc}/></td>
                    <td><input type="text" placeholder={attendance.atdEtc} name="atdEtc" onChange={onChangeHandler} className={ApplideCertidocCSS.inputAtdEtc}/></td>           
                    <td><button onClick={()=> onClickHandler(attendance.atdCode)}>수정</button></td>   
                   </tr>
                ))}   
                    </tbody>
                </table>       
                <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
                </div>                       
            </div>                   
        </motion.div>
    )
}

export default AttendanceEmployeeDetail;