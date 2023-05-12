import { useState } from 'react';
import CommonCSS from '../../css/common/Common.module.css'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

function Header ({ setActiveIndex, isDark, setIsDark }) {

    /*  setActiveIndex : 로고 및 마이페이지 아이콘을 클릭 시, Nav바 활성화 취소 */

    const navigate = useNavigate();
    const [mpgIsHovered, setMpgIsHovered] = useState(false);
    const [notiIsHovered, setNotiIsHovered] = useState(false);
    const [msgIsHovered, setMsgIsHovered] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    /* 다크모드/라이트모드를 제어하기 위한 이벤트 함수 */
    const darkModeHandler = () => setIsDark(!isDark);

    return (
        <>
            <motion.div className={ isDark ? CommonCSS.headerBoxDark : CommonCSS.headerBoxLight }
                        animate={{ backgroundColor: isDark ? "#4D4D4D" : "#FFF" }}
                        transition={{ duration: 0.5 }}
            >
                <p
                    className={ CommonCSS.logo }
                    onClick={ () => { 
                        setActiveIndex('');
                        navigate('/'); 
                    } }
                >
                    <span>M</span>ingle
                </p>
                <p className={ CommonCSS.hello }>mingler님 안녕하세요 :)</p>
                <div className={ CommonCSS.iconBox }>
                    { mpgIsHovered? 
                        (<motion.img src="/images/mypage-hover.png" 
                              onMouseLeave={ () => setMpgIsHovered(false) }
                              onClick={ () => {
                                setActiveIndex('');
                                navigate('/mypage');
                              }}
                              whileHover={{ scale: 1.05 }}
                        />)
                        : (<img src="/images/mypage.png" onMouseEnter={ () => setMpgIsHovered(true) }/>)
                    }
                    { notiIsHovered? 
                        (<motion.img src="/images/notification-hover.png" 
                              onMouseLeave={ () => setNotiIsHovered(false) }
                              onClick={ () => navigate('/') }
                              whileHover={{ scale: 1.05 }}
                        />)
                        : (<img src="/images/notification.png" onMouseEnter={ () => setNotiIsHovered(true) }/>)
                    }
                    { msgIsHovered? 
                        (<motion.img src="/images/message-hover.png" 
                              onMouseLeave={ () => setMsgIsHovered(false) }
                              onClick={ () => navigate('/') }
                              whileHover={{ scale: 1.05 }}
                        />)
                        : (<img src="/images/message.png" onMouseEnter={ () => setMsgIsHovered(true) }/>)
                    }
                    { isDark ? (
                        <motion.img
                        src={isHovered ? "/images/whitemode-hover.png" : "/images/whitemode.png"}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={darkModeHandler}
                        whileHover={{ scale: 1.05 }}
                        />
                    ) : (
                        <motion.img
                        src={isHovered ? "/images/darkmode-hover.png" : "/images/darkmode.png"}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={darkModeHandler}
                        whileHover={{ scale: 1.05 }}
                        />
                    )
                    }
                </div>
                <div className={ isDark ? CommonCSS.buttonBoxDark : CommonCSS.buttonBoxLight }>
                    <motion.button
                        onClick={ () => navigate('/') }
                        whileHover={{ scale: 1.03 }}
                    >
                        logout
                    </motion.button>
                </div>
            </motion.div>
        </>
    );
}

export default Header;