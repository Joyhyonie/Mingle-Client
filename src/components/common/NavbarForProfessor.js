import { motion } from "framer-motion";
import CommonCSS from '../../css/common/Common.module.css'
import NavbarForProfessorItem from "./NavbarForProfessorItem";

function NavbarForProfessor ({ activeIndex, setActiveIndex, isDark, setIsDark }) {

    const MENU_LIST = [
        { title: '공지사항'},
        { title: '조직도',},
        { title: '증명서', list: ['증명서 발급 신청', '증명서 발급 이력'] },
        { title: '강의 관리', list: ['출결 및 성적관리', '강의 개설'] }
    ];
    

    return (
        <>
            <motion.div className={ isDark ? CommonCSS.navBarBoxDark : CommonCSS.navBarBoxLight }
                        animate={{ backgroundColor: isDark ? "#343434" : "#FFF" }}
                        transition={{ duration: 0.5 }}
            >
                <div>
                    {MENU_LIST.map((item, index) => {
                        const active = index === activeIndex ? CommonCSS.active : '';

                        return (
                            <NavbarForProfessorItem
                                key={index}
                                title={item.title}
                                index={index}
                                list={item.list}
                                active={active}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        );
                    })}
                </div>
            </motion.div>
        </>
    );
}

export default NavbarForProfessor;

