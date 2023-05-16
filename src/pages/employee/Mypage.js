import { useDispatch, useSelector } from 'react-redux';
import MypageCSS from '../../css/Mypage.module.css';
import { useEffect } from 'react';
import { callGetEmployeeAPI } from '../../apis/EmployeeAPICalls';

function Mypage () {

    const dispatch = useDispatch();
    const { employee } = useSelector(state => state.employeeReducer);

    useEffect(
        () => {
            dispatch(callGetEmployeeAPI());
        },
        []
    );


    return (
        <div 
            className={MypageCSS.backgroundDiv}
            style={{ backgroundColor: 'white' }}
        >
            {employee && 
                <div className={MypageCSS.registerDiv}>
                    <img src="" alt="" />

                    <div className={MypageCSS.row}>
                        <div className={MypageCSS.column2}>
                       
                            <div className={MypageCSS.namebar}>
                            <label>이름</label>
                            <input
                                type="text"
                                readOnly={true}
                                value={employee.data.empName}
                            />
                            </div>
                            <div className={MypageCSS.Enamebar}>
                            <input
                            type="text"
                            readOnly={true}
                            value={employee.data.empNameEn}
                            />
                            </div>
                        </div>
                        
                        <div className={MypageCSS.column}>
                            <label htmlFor="employeeName">메일</label>
                            <input
                                id="employeeName"
                                type="text"
                                readOnly={true}
                                value={employee.data.empEmail}
                            />
                        </div>
                        <div className={MypageCSS.column}>
                            <label htmlFor="employeeEmail">번호</label>
                            <input
                                id="employeeEmail"
                                type="text"
                                readOnly={true}
                                value={employee.data.empPhone}
                            />
                        </div>
                        <div className={MypageCSS.column}>
                            <label htmlFor="employeeEmail">주소</label>
                            <input
                                id="employeeEmail"
                                type="text"
                                readOnly={true}
                                value={employee.data.empAddress}
                            />
                        </div>
                        <div className={MypageCSS.column3}>
                            <input
                                id="employeeEmail"
                                type="text"
                                readOnly={true}
                                value={employee.data.employeeEmail}
                            />
                        </div>
                    </div>






                    <div className={MypageCSS.row1}>
                        <div className={MypageCSS.column}>
                            <label>교번</label>
                            <input
                                type="text"
                                readOnly={true}
                                value={employee.data.empCode}
                            />
                            
                        </div>
                        
                        <div className={MypageCSS.column}>
                            <label htmlFor="employeeName">상태</label>
                            <input
                                id="employeeName"
                                type="text"
                                readOnly={true}
                                value={employee.data.empStatus}
                            />
                        </div>
                        <div className={MypageCSS.column}>
                            <label htmlFor="employeeEmail">입사</label>
                            <input
                                id="employeeEmail"
                                type="text"
                                readOnly={true}
                                value={employee.data.empEntDate.substring(0, 10)}
                            />
                        </div>
                        <div className={MypageCSS.column}>
                            <label htmlFor="employeeEmail">소속</label>
                            <input
                                id="employeeEmail"
                                type="text"
                                readOnly={true}
                                value={employee.data.department}
                            />
                        </div>
                        <div className={MypageCSS.column}>
                            <label htmlFor="employeeEmail">연차</label>
                            <input
                                id="employeeEmail"
                                type="text"
                                readOnly={true}
                                value={employee.data.empAnnual}
                            />
                        </div>
                    </div>
                </div>
                
            }
        </div>
    );

        }
export default Mypage;