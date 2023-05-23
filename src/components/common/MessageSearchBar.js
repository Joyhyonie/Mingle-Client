import { useEffect, useState } from 'react';
import MessageCSS from '../../css/Message.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { callReceivedMsgSearchAPI } from '../../apis/MessageAPICalls';
import { callSentMsgSearchAPI } from '../../apis/MessageAPICalls';
import { callLikedMsgSearchAPI } from '../../apis/MessageAPICalls';

function MessageSearchBar ({msgBoxType}) {

    const dispatch = useDispatch();
    const [condition, setCondition] = useState('empName');
    const [word, setWord] = useState('');

    useEffect(
        () => {
            console.log('condition => ', condition);
            console.log('word =>', word);
        },[condition, word]
    );

    /* Enter키를 눌렀을 때의 이벤트 함수 */
    const onEnterHandler = (e) => {

        if(e.key === 'Enter') {
            if(msgBoxType === 'received') {
                dispatch(callReceivedMsgSearchAPI(condition, word));
            } else if(msgBoxType === 'sent') {
                dispatch(callSentMsgSearchAPI(condition, word));
            } else if(msgBoxType === 'liked') {
                dispatch(callLikedMsgSearchAPI(condition, word));
            }
        }

    }

    return (
        <>
        <div className={ MessageCSS.msgSearchBox }>
            <select className={ MessageCSS.msgSearchSelect } value={condition} onChange={(e) => setCondition(e.target.value)}>
                <option value='empName'>교직원명</option>
                <option value='msgContent'>내용</option>
            </select>
            <img src={`${process.env.PUBLIC_URL}/images/down.png`}/>
            <input 
                className={ MessageCSS.msgSearchWord }
                type="text"
                placeholder="검색어 입력 :)"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                onKeyPress={ onEnterHandler }
            />
        </div>
        </>
    );
}

export default MessageSearchBar;