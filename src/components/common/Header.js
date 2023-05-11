import { useState } from 'react';
import CommonCSS from '../../css/common/Common.module.css'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

function Header ({ setActiveIndex }) {

    /*  setActiveIndex : 로고 및 마이페이지 아이콘을 클릭 시, Nav바 활성화 취소 */

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
                                navigate('/mypage')
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
                    { darkIsHovered? 
                        (<motion.img src="/images/darkmode-hover.png" 
                              onMouseLeave={ () => setDarkIsHovered(false) }
                              onClick={ () => navigate('/') }
                              whileHover={{ scale: 1.05 }}
                        />)
                        : (<img src="/images/darkmode.png" onMouseEnter={ () => setDarkIsHovered(true) }/>)
                    }
                </div>
                <div className={ CommonCSS.buttonBox }>
                    <motion.button
                        onClick={ () => navigate('/') }
                        whileHover={{ scale: 1.03 }}
                    >
                        logout
                    </motion.button>
                </div>
            </div>
        </>
    );
}

export default Header;