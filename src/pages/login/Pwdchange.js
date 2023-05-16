import PwdchangeCSS from '../../css/Pwdchange.module.css';

function PwdChange() {

    const style = {
        story:{
            "margin-top":"20px"
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
                                    type="text"
                                    name="empName"
                                    placeholder="현재 비밀번호를 입력하세요."
                                    autoComplete='off'
                                            />
                                <input
                                    type="email"
                                    name="empEmail"
                                    placeholder="새 비밀번호를 입력하세요."
                                    autoComplete='off'
                                />
                                <input
                                    type="email"
                                    name="empEmail"
                                    placeholder="새 바밀번호 확인."
                                    autoComplete='off'
                                />
                                </div>
                        <span>
                            <div style={style.story}>
                                    <div>비밀번호는 영문과 특수문자, 숫자 2가지 이상 조합하여 10~16자리로 입력해주세요.</div>
                                    <div>개인정보와 관련된 숫자 등 다른 사람이 알아낼 수 있는 비밀번호는 사용하지 않는 것이 안전합니다.</div>
                                    <button
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
export default PwdChange;