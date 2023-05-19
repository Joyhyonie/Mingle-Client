import IdsearchCSS from '../../css/Idsearch.module.css';


function PwdSearch(){
    const style = {
        story:{
            "margin-top":"20px"
        }
    };




    return (
        <>
        <div className={ IdsearchCSS.backgroundDiv }>
            <div className={ IdsearchCSS.loginDiv }>
        <h1>비밀번호 찾기</h1>
        <span>
        <input
            type="text"
            name="empCode"
            placeholder="아이디를 입력하세요."
            autoComplete='off'
        />
        <input
            type="email"
            name="empEmail"
            placeholder="이메일을 입력하세요."
            autoComplete='off'
        />
        <div style={style.story}>
       <div>회원가입 시 입력하신 이메일로 임시 비밀번호가 발송됩니다.</div>
       <div>정확한 정보를 입력해 주세요.</div>
       </div>
        <button

        >
            이메일 전송
        </button>
        </span>
        </div>
        </div>
        
    </>
        );


}

export default PwdSearch;