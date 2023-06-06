import { motion } from "framer-motion"
import CommonCSS from '../../css/common/Common.module.css'
import BoardCSS from '../../css/Board.module.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { callBoardRegistAPI } from "../../apis/BoardAPICalls";

function BoardRegist () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const textRef = useRef(null);
    const { regist } = useSelector(state => state.BoardReducer);
    const [editorValue, setEditorValue] = useState('');
    const [form, setForm] = useState({});

    useEffect(
        () => {
            if(regist?.status === 200) {
                toast.success("공지가 성공적으로 등록되었습니다 :)");
                navigate('/board', { replace : true });
            }
        },[regist]
    );

    function EditorBox() {

        return (
            <Editor
                ref={textRef}
                placeholder="내용을 입력해주세요 :D" 
                initialValue={editorValue}   // 입력되고 있는 editor내의 input값
                autofocus={true}
                previewStyle="vertical"
                height="560px"
                border="none"
                initialEditType="wysiwyg"
                useCommandShortcut={false}
                hideModeSwitch={true}
                plugins={[colorSyntax]}
                onChange={changeEditorHandler}
            />
        );
    }

    /* textRef를 이용하여 입력된 값을 state에 저장 */
    const changeEditorHandler = () => {
        const editorInstance = textRef.current.getInstance();
        setEditorValue(editorInstance.getHTML());
        setForm({
            ...form,
            boardContent: editorInstance.getHTML()
        });
    }

    /* 공지사항 제목, 타입을 state에 저장 */
    const changeInputHandler = (e) => {
        if (e.target.name === 'boardTitle') {
            setForm({
                ...form,
                boardTitle: e.target.value
            });
        } else if (e.target.name === 'boardType') {
            setForm({
                ...form,
                boardType: e.target.value
            });
        }
    }

    /* '등록' 버튼을 누를 시, 해당 게시글이 등록되는 이벤트 함수 */
    const registBoardHandler = () => {

        if(!form.boardTitle || form.boardTitle.trim() === '') {
            toast.error("공지의 제목을 입력해주세요 !");
        } else if(!form.boardType) {
            toast.error("분류를 선택해주세요 !");
        } else if(!form.boardContent || form.boardContent.trim() === '') {
            toast.error("내용을 입력해주세요 !");
        } else {
            // 서버로 전달 할 FormData형태의 객체 설정
            const formData = new FormData();
            formData.append("boardTitle", form.boardTitle);
            formData.append("boardType", form.boardType);
            formData.append("boardContent", form.boardContent);

            dispatch(callBoardRegistAPI(formData));
        }

        
    }
    
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <p className={ CommonCSS.pageDirection }>공지사항 ▸ 공지 등록</p>
            <div className={ BoardCSS.buttonBox }>
                <button 
                    className={ BoardCSS.whiteButton }
                    onClick={ () => navigate(-1) }
                >
                    취소
                </button>
                <button 
                    className={ BoardCSS.pinkButton }
                    onClick={ registBoardHandler }
                >
                    등록
                </button>
            </div>
            <div className={ BoardCSS.inputBox }>
                <input 
                    type="text" 
                    name="boardTitle"
                    className={ BoardCSS.inputTitle } placeholder="공지의 제목을 입력해주세요 :)"
                    onChange={ changeInputHandler }
                />
                <select 
                    name="boardType"
                    className={ BoardCSS.selectType }
                    onChange={ changeInputHandler }
                >
                    <option disabled selected>분류 선택</option>
                    <option value='학사'>학사</option>
                    <option value='장학'>장학</option>
                    <option value='행사'>행사</option>
                    <option value='취업'>취업</option>
                    <option value='기타'>기타</option>
                </select>
                <img src={`${process.env.PUBLIC_URL}/images/down.png`}/>
            </div>
            <div className={ BoardCSS.contentBox }>
                <div className={ BoardCSS.editorBox }>
                {EditorBox()}
                </div>
            </div>
        </motion.div>
    );
}

export default BoardRegist;