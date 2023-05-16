import IdsearchCSS from '../../css/Idsearch.module.css';

function IdSearch(){
    const style = {
        story:{
            "margin-top":"20px"
        }
    };

    return (
        <>
        <div className={ IdsearchCSS.backgroundDiv }>
            <div className={ IdsearchCSS.loginDiv }>
        <h1>아이디 찾기</h1>
        <span>
        <input
            type="text"
            name="empName"
            placeholder="이름를 입력하세요."
            autoComplete='off'
        />
        <input
            type="email"
            name="empEmail"
            placeholder="이메일를 입력하세요."
            autoComplete='off'
        />
        <div style={style.story}>
       <div>회원가입 시 입력하신 이름과 이메일로 인증메일이 발송됩니다.</div>
       <div>정확한 정보를 입력해 주세요.</div>
       </div>
        <button

        >
            확인
        </button>
        </span>
        </div>
        </div>
        
    </>
    )


}

export default IdSearch;