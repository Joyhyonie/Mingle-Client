import CommonCSS from "../../css/common/Common.module.css"

function LogoutModal ({logoutHandler, setLogoutModal, setLogoutClicked}) {

    return (
        <div className={ CommonCSS.logoutModal } onClick={ () => setLogoutModal(false) }>
            <div className={ CommonCSS.modalContainer } onClick={ (e) => e.stopPropagation() }>
                <p>로그아웃 하시겠습니까?</p>
                <div className={ CommonCSS.logoutButtonBox }>
                    <button
                        className={ CommonCSS.blackButton }
                        onClick={ logoutHandler }
                    >
                            로그아웃
                    </button>
                    <button
                        className={ CommonCSS.whiteButton }
                        onClick={ () => {setLogoutModal(false); setLogoutClicked(false);} }
                    >
                            취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutModal;