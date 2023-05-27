import { useState } from 'react';
import PwdchangeCSS from '../../css/Pwdchange.module.css';
import { callPwdChangeAPI } from "../../apis/EmployeeAPICalls";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetEmployee } from '../../modules/EmployeeModule';
import { toast } from 'react-hot-toast';


function PwdChangeForm() {

    const dispatch = useDispatch();
    const { change } = useSelector(state => state.EmployeeReducer);

    const style = {
        story:{
            "margin-top":"20px"
        }
    };



    // 폼 데이터를 한 번에 변경 및 state 저장
    const[form, setForm] = useState({
        existingPassword:'',
        newPassword:'',
        confirmPassword:''
    });

   
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    // 확인 버튼 클릭 이벤트
    const onClickHandler = () => {
           dispatch(callPwdChangeAPI(form)) .then(() => {
            setForm(initialForm); // 변경 성공 시, 입력값 초기화
          })
          .catch((error) => {
            // 변경 실패 처리
            console.error('An error occurred:', error);
            toast.error('비밀번호 변경에 실패했습니다.');
          });
      };

      const initialForm = {
        existingPassword: '',
        newPassword: '',
        confirmPassword: '',
      };

      const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
          onClickHandler();
        }
      };

    return (
        <>
        <div className={ PwdchangeCSS.backgroundDiv }>
            <div className={ PwdchangeCSS.loginDiv }>
                <div>
                    <div className={ PwdchangeCSS.sky }>
                          <h2>비밀번호 변경</h2>
                                <input
                                    type="password"
                                    name="existingPassword"
                                    placeholder="현재 비밀번호를 입력하세요."
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                    value={form.existingPassword} 
                                    onKeyUp={onKeyPressHandler}
                                            />
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="새 비밀번호를 입력하세요."
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                    value={form.newPassword} 
                                    onKeyUp={onKeyPressHandler}
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="새 바밀번호 확인."
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                    value={form.confirmPassword} 
                                    onKeyUp={onKeyPressHandler}
                                />
                                </div>
                        <span>
                            <div style={style.story}>
                                    <div>비밀번호는 영문과 특수문자, 숫자 2가지 이상 조합하여 10~16자리로 입력해주세요.</div>
                                    <div>개인정보와 관련된 숫자 등 다른 사람이 알아낼 수 있는 비밀번호는 사용하지 않는 것이 안전합니다.</div>
                                    <button
                                     onClick={ onClickHandler } 
                                    >
                                        확인
                                    </button>
                            </div>
                        </span>
                        </div>

                 </div>
        </div>
        
    </>
        );
    
}
export default PwdChangeForm;