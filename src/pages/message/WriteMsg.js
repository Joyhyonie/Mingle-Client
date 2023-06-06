import { motion } from "framer-motion"
import MessageCSS from '../../css/Message.module.css';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { callDepartmentListAPI, callEmployeeListAPI, callSendMsgAPI } from "../../apis/MessageAPICalls";

function WriteMsg ({replyContent, selectedDeptCode, selectedEmpCode, selectedEmpName, selectedEmpId, setWhichPage, stateChangeHandler}) {

    const dispatch = useDispatch();
    const textareaRef = useRef(null); // 내용이 작성되어있는지 확인하기 위한 Ref
    const { departmentList, employeeList, sendMsg } = useSelector(state => state.MessageReducer);
    const { employee } = useSelector(state => state.EmployeeReducer);
    const [pickedDepartment, setPickedDepartment] = useState('');
    const [pickedEmpCode, setPickedEmpCode] = useState('');
    const [pickedEmpId, setPickedEmpId] = useState('');
    

    useEffect(
        () => {
            // 존재하는 학과 조회 API 호출
            dispatch(callDepartmentListAPI());

            if(pickedDepartment) {
                // 학과가 선택되었을 경우, 학과에 해당하는 교직원들 조회 API
                dispatch(callEmployeeListAPI(pickedDepartment));
            }

        },[pickedDepartment]
    );

    useEffect(
        () => {
            
            if(sendMsg?.status === 200) {
                toast.success('쪽지가 정상적으로 전송되었습니다 :)');
                setWhichPage('sentMsgBox');             // '보낸 쪽지함'으로 페이지 이동
                stateChangeHandler('sentIsClicked');    // Nav바를 '보낸 쪽지함'으로 설정
            }

        },[sendMsg]
    );

    /* 학과가 선택/변경될 때 동작하는 이벤트 함수 */
    const departmentChangeHandler = (e) => {
        setPickedDepartment(e.target.value);
    }

    /* 교직원이 선택/변경될 때 동작하는 이벤트 함수 */
    const employeeChangeHandler = (e) => {
        setPickedEmpCode(e.target.value);
        setPickedEmpId(e.target.id);
    }

    /* 쪽지 전송을 위한 함수 */
    const sendMessageHandler = () => {

        const messageContent = textareaRef.current.value.trim();
        
        if (!selectedEmpCode && !pickedEmpCode) {
            toast.error('받는 사람을 선택해주세요 !');
            return;
        } else if (!messageContent) {
            toast.error('내용을 입력해주세요 !');
            return;
        } else if (employee.empCode == pickedEmpCode) {
            toast.error('자신에게 쪽지를 보낼 수 없습니다 !');
            return;
        } else {
            /* FormData 객체 설정 */
            // '답장'을 클릭하여 쪽지를 전송할 때에는 picked가 아닌 props로 받아온 selected를 formData에 설정
            const formData = new FormData();
            const empCode = selectedEmpCode ? selectedEmpCode : pickedEmpCode;   
            const empId = selectedEmpId ? selectedEmpId : pickedEmpId;

            formData.append("receiver.empCode", empCode);
            formData.append("receiver.empId", empId);
            formData.append("msgContent", messageContent);

            /* 쪽지를 등록하는 API */
            dispatch(callSendMsgAPI(formData));
        }

    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            <div className={ MessageCSS.selectReceiverBox }>
                <p>to</p>
                <select 
                    className={ MessageCSS.selectDepartment }
                    value={selectedDeptCode ? selectedDeptCode : pickedDepartment}
                    onChange={departmentChangeHandler}
                    onClick={departmentChangeHandler}
                    disabled={selectedDeptCode ? true : false}
                >
                    <option value='' disabled>소속</option>
                    {/* departmentList 배열을 option으로 변환 */}
                    {departmentList && departmentList.map(dept => (
                    <option key={dept.deptCode} 
                            value={dept.deptCode}
                    >
                        {dept.deptName}
                    </option>
                    ))}
                </select>
                <img src={`${process.env.PUBLIC_URL}/images/down.png`}/>
                <select
                    className={ MessageCSS.selectEmployee }
                    value={selectedEmpCode ? selectedEmpCode : pickedEmpCode}
                    onChange={employeeChangeHandler}
                    disabled={!pickedDepartment}
                >
                    { selectedEmpName ? <option>{selectedEmpName}</option> : <option value='' disabled>이름</option> }
                    {/* employeeList 배열을 option으로 변환 */}
                    {employeeList && employeeList.map(emp => (
                    <option key={emp.empCode} 
                            id={emp.empId}
                            value={emp.empCode}
                    >
                        {emp.empName}
                    </option>
                    ))}
                </select>
                <img src={`${process.env.PUBLIC_URL}/images/down.png`}/>
            </div>

            <textarea
                className={ MessageCSS.textBox }
                placeholder="내용을 입력해주세요 :)"
                ref={textareaRef}
            >
                {replyContent ? '[답장] ' + replyContent + '\n\n\n\n' : null}
            </textarea>

            <button
                className={ MessageCSS.sendButton }
                onClick={ sendMessageHandler }
            >
                전송
            </button>
        </motion.div>
    );
}

export default WriteMsg;