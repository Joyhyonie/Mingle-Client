import { useState } from 'react';
import MessageCSS from '../../css/Message.module.css'

function MessageSearchBar () {

    const [searchWord, setSearchWord] = useState('');

    /* 검색어 이벤트 함수 */
    const onChangeHandler = (e) => {
        setSearchWord(e.target.value);
    }

    /* Enter키를 눌렀을 때의 이벤트 함수 */
    const onEnterHandler = (e) => {
        if(e.key === 'Enter') {
            /* 검색 기능 추가되어야함 */
        }
    }

    return (
        <>
        <div className={ MessageCSS.msgSearchBox }>
            <select className={ MessageCSS.msgSearchSelect }>
                <option value='empName'>교직원명</option>
                <option value='msgContent'>내용</option>
            </select>
            <img src={`${process.env.PUBLIC_URL}/images/down.png`}/>
            <input 
                className={ MessageCSS.msgSearchWord }
                type="text"
                placeholder="검색어 입력 :)"
                value={searchWord}
                onChange={onChangeHandler}
                onKeyPress={ onEnterHandler }
            />
        </div>
        </>
    );
}

export default MessageSearchBar;