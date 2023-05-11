import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import CommonCSS from '../../css/common/Common.module.css'


function NavbarForAdminItem ({ title, index, list, active, activeIndex, setActiveIndex }) {

    const navigate = useNavigate();
    const [clickedIndex, setClickedIndex] = useState();
    const [isOpen, setIsOpen] = useState(false);
    
    // 상위 메뉴 클릭 시, activeIndex에 index 저장
    const clickHandler = () => {

        setIsOpen(!isOpen);

        if (list) {
            setActiveIndex(index);
            setClickedIndex(null);
        } else {
            setActiveIndex(index);
            switch (title) {
                case '공지사항' : return navigate('/board');
                case '조직도' : return navigate('/organization');
                case '과목 관리' : return navigate('/');
                case '학사 일정 관리' : return navigate('/');
            }
        }
    }

    // 하위 메뉴 클릭 시, 이벤트 함수
    const linkHandler = (e, index) => {
        setClickedIndex(index);
        switch (list[index]){
            case '증명서 발급 신청 내역' : return navigate('/certi-doc-applied');
            case '증명서 발급 신청' : return navigate('/certi-doc-apply');
            case '증명서 발급 이력' : return navigate('/certi-doc-mine');
        }
    }
        

    return (
        <>
            {/* 상위 컴포넌트에서 받아 온 active변수를 className으로 넘겨줌 => active 활성화 시, 그에 맞는 스타일 추가 */}
            <div className={ active }>
                <div 
                    className={ CommonCSS.superMenu }  
                    onClick={ clickHandler }
                    transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                    { title }
                </div>
                <AnimatePresence>
                    {isOpen && (
                    <div className={ index === activeIndex ? '' : CommonCSS.closed }>
                        {list?.map((menu, index) => {
                            return(
                                <motion.p 
                                    key={index}
                                    onClick={ (e) => linkHandler(e, index) }
                                    className={ clickedIndex === index ? CommonCSS.activelist : '' }
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                                >
                                    { menu }
                                </motion.p>
                            );
                        })}
                    </div>
                    )}
                </AnimatePresence>
            </div>

        </>
    );
}

export default NavbarForAdminItem;