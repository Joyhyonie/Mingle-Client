import { useState } from 'react';
import CommonCSS from '../../css/common/Common.module.css'
import { useNavigate } from 'react-router-dom';

function Header () {

    const navigate = useNavigate();
    const [mpgIsHovered, setMpgIsHovered] = useState(false);
    const [notiIsHovered, setNotiIsHovered] = useState(false);
    const [msgIsHovered, setMsgIsHovered] = useState(false);
    const [darkIsHovered, setDarkIsHovered] = useState(false);

    return (
        <>
            <div className={ CommonCSS.headerBox }>
                <p
                    className={ CommonCSS.logo }
                    onClick={ () => navigate('/') }
                >
                    <span>M</span>ingle
                </p>
                <p className={ CommonCSS.hello }>mingler님 안녕하세요 :)</p>
                <div className={ CommonCSS.iconBox }>
                    { mpgIsHovered? 
                        (<img src="/images/mypage-hover.png" 
                              onMouseLeave={ () => setMpgIsHovered(false) }
                              onClick={ () => navigate('/mypage') }
                        />)
                         : (<img src="/images/mypage.png" onMouseEnter={ () => setMpgIsHovered(true) }/>)
                    }
                    { notiIsHovered? 
                        (<img src="/images/notification-hover.png" 
                              onMouseLeave={ () => setNotiIsHovered(false) }
                              onClick={ () => navigate('/') }
                        />)
                        : (<img src="/images/notification.png" onMouseEnter={ () => setNotiIsHovered(true) }/>)
                    }
                    { msgIsHovered? 
                        (<img src="/images/message-hover.png" 
                              onMouseLeave={ () => setMsgIsHovered(false) }
                              onClick={ () => navigate('/') }
                        />)
                        : (<img src="/images/message.png" onMouseEnter={ () => setMsgIsHovered(true) }/>)
                    }
                    { darkIsHovered? 
                        (<img src="/images/darkmode-hover.png" 
                              onMouseLeave={ () => setDarkIsHovered(false) }
                              onClick={ () => navigate('/') }
                        />)
                        : (<img src="/images/darkmode.png" onMouseEnter={ () => setDarkIsHovered(true) }/>)
                    }
                </div>
                <div className={ CommonCSS.buttonBox }>
                    <button
                        onClick={ () => navigate('/') }
                    >
                        logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default Header;