import { motion } from "framer-motion"
import MessageCSS from '../../css/Message.module.css';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { callDepartmentListAPI, callEmployeeListAPI, callSendMsgAPI } from "../../apis/MessageAPICalls";

function WriteMsg ({replyContent, selectedDeptCode, selectedEmpCode, selectedEmpName, setWhichPage, stateChangeHandler}) {

    const dispatch = useDispatch();
    const textareaRef = useRef(null); // 내용이 작성되어있는지 확인하기 위한 Ref
    const { department, employee, sendMsg } = useSelector(state => state.MessageReducer);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    
    console.log('department => ', department);
    console.log('employee => ', employee);
    console.log('답장 시, selectedDeptCode => ', selectedDeptCode);
    console.log('답장 시, selectedEmpCode => ', selectedEmpCode);
    console.log('답장 시, selectedEmpName =>', selectedEmpName);

    /* (임시용) 출력 현황 체크 */
    useEffect(
        () => {
            console.log('selectedDepartment => ', selectedDepartment);
            console.log('selectedEmployee => ', selectedEmployee);
        },[selectedDepartment, selectedEmployee]
    ); 

    useEffect(
        () => {
            // 존재하는 학과 조회 API 호출
            dispatch(callDepartmentListAPI());

            if(selectedDepartment) {
                // 학과가 선택되었을 경우, 학과에 해당하는 교직원들 조회 API
                dispatch(callEmployeeListAPI(selectedDepartment));
            }

        },[selectedDepartment]
    );

    useEffect(
        () => {
            
            if(sendMsg?.status === 200) {
                toast.success('쪽지가 정상적으로 전송되었습니다');
                setWhichPage('sentMsgBox');             // '보낸 쪽지함'으로 페이지 이동
                stateChangeHandler('sentIsClicked');    // Nav바를 '보낸 쪽지함'으로 설정
            }

        },[sendMsg]
    );

    /* 학과가 선택/변경될 때 동작하는 이벤트 함수 */
    const departmentChangeHandler = (e) => {
        setSelectedDepartment(e.target.value);
        // setSelectedEmployee('');
    }

    /* 교직원이 선택/변경될 때 동작하는 이벤트 함수 */
    const employeeChangeHandler = (e) => {
        setSelectedEmployee(e.target.value);
    }

    /* 입력된 쪽지 내용을 확인하기 위한 이벤트 함수 */
    const textChangeHandler = (e) => {
        console.log(e.target.value);
    }

    /* 쪽지 전송을 위한 함수 */
    const sendMessageHandler = () => {

        const messageContent = textareaRef.current.value.trim();
        console.log("messageContent => ", messageContent);

        if (!selectedEmpCode && !selectedEmployee) {
            toast.error('받는 사람을 선택해주세요 !');
            return;
        } else if (!messageContent) {
            toast.error('내용을 입력해주세요 !');
            return;
        }

        /* FormData 객체 설정 */
        const formData = new FormData();
        const empCode = selectedEmpCode ? selectedEmpCode : selectedEmployee;   // '답장'을 클릭하여 전송 시를 위한 조건 설정
        formData.append("receiver.empCode", empCode);
        formData.append("msgContent", messageContent);

        /* 쪽지를 등록하는 API */
        dispatch(callSendMsgAPI(formData));

    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            <div className={ MessageCSS.selectReceiverBox }>
                <p>to</p>
                <select 
                    className={ MessageCSS.selectDepartment }
                    value={selectedDeptCode ? selectedDeptCode : selectedDepartment}
                    onChange={departmentChangeHandler}
                    onClick={departmentChangeHandler}
                    disabled={selectedDeptCode ? true : false}
                >
                    <option value='' disabled>소속</option>
                    {/* departments 배열을 option으로 변환 */}
                    {department && department.map(dept => (
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
                    value={selectedEmpCode ? selectedEmpCode : selectedEmployee}
                    onChange={employeeChangeHandler}
                    disabled={!selectedDepartment}
                >
                    { selectedEmpName ? <option>{selectedEmpName}</option> : <option value='' disabled>이름</option> }
                    {/* employees 배열을 option으로 변환 */}
                    {employee && employee.map(emp => (
                    <option key={emp.empCode} 
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
                onChange={ textChangeHandler }
            >
                {replyContent ? replyContent + '\n\n------------------------------------------\n\n' : null}
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