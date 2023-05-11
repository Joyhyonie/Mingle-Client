import { useState } from 'react';
import CommonCSS from '../../css/common/Common.module.css'
import NavbarItem from '../items/NavbarItem';

function NavBar () {

    const MENU_LIST = [
        { title: '공지사항'},
        { title: '조직도',},
        { title: '증명서', list: ['증명서 발급 신청 내역', '증명서 발급 신청', '증명서 발급 이력'] },
        { title: '근태 관리', list: ['교직원 근태 기록', '휴가 신청 내역'] },
        { title: '과목 관리',},
        { title: '강의 관리', list: ['출결 및 성적관리', '강의 개설'] },
        { title: '학사 관리', list: ['교직원','학생'] },
        { title: '학사 일정 관리'}

    ];

    const [activeIndex, setActiveIndex] = useState();
    

    return (
        <>
            <div className={ CommonCSS.navBarBox }>
                <div>
                    {MENU_LIST.map((item, index) => {
                        const active = index === activeIndex ? CommonCSS.active : '';

                        return (
                            <NavbarItem
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
            </div>
        </>
    );
}

export default NavBar;

