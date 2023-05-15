import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MessageCSS from '../../css/Message.module.css'


function MessageSelectBar ({selectedDeptCode, selectedEmpCode}) {

    console.log(selectedDeptCode);
    console.log(selectedEmpCode);

    const dispatch = useDispatch();
    const [departments, setDepartments] = useState([{deptCode:1, deptName:'학생처'},{deptCode:2, deptName:'교무처'},{deptCode:3, deptName:'총무처'}]); // (임시용 기본값)
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [employees, setEmployees] = useState([{empCode:202322222, empName: '김맹구'}, {empCode:202311111, empName: '신짱구'}, {empCode:202312345, empName: '허치즈'}]); // (임시용 기본값)
    const [selectedEmployee, setSelectedEmployee] = useState('');
    
    useEffect(
        () => {
            // 존재하는 학과 조회 API
            // dispatch(callGetDepartments());

            // API 응답 데이터를 departments 상태 변수에 저장
            // setDepartments(response.data);
        },[]
    );

    useEffect(
        () => {
            if(selectedDepartment) {
                // 학과가 선택되었을 경우, 학과에 해당하는 교직원들 조회 API
                // dispatch(callGetEmployees(selectedDepartment));

                // API 응답 데이터를 employees 상태 변수에 저장
                // setEmployees(response.data);
            }
        },[selectedDepartment]
    );

    /* 학과가 선택/변경될 때 동작하는 이벤트 함수 */
    const departmentChangeHandler = (e) => {
        setSelectedDepartment(e.target.value);
        setSelectedEmployee('');
    }

    /* 교직원이 선택/변경될 때 동작하는 이벤트 함수 */
    const employeeChangeHandler = (e) => {
        setSelectedEmployee(e.target.value);
    }

    return (
        <div className={ MessageCSS.selectReceiverBox }>
            <p>to</p>
            <select 
                className={ MessageCSS.selectDepartment }
                value={selectedDeptCode ? selectedDeptCode : selectedDepartment}
                onChange={departmentChangeHandler}
            >
                <option value=''>소속</option>
                {/* departments 배열을 option으로 변환 */}
                {departments.map(department => (
                <option key={department.deptCode} 
                        value={department.deptCode}
                >
                    {department.deptName}
                </option>
                ))}
            </select>
            <img src="./images/down.png"/>
            <select
                className={ MessageCSS.selectEmployee }
                value={selectedEmpCode? selectedEmpCode : selectedEmployee}
                onChange={employeeChangeHandler}
                disabled={!selectedDepartment}
            >
                {/* employees 배열을 option으로 변환 */}
                {employees && employees.map(employee => (
                <option key={employee.empCode} 
                        value={employee.empCode}
                >
                    {employee.empName}
                </option>
                ))}
            </select>
            <img src="./images/down.png"/>
        </div>
    );
}

export default MessageSelectBar;