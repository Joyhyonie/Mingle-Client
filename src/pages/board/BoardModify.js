import { motion } from "framer-motion"
import CommonCSS from '../../css/common/Common.module.css'
import BoardCSS from '../../css/Board.module.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-hot-toast';
import { callBoardDetailAPI, callBoardModifyAPI } from "../../apis/BoardAPICalls";

function BoardModify () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const boardCode = params.boardCode;
    const textRef = useRef(null);
    const { board, modify } = useSelector(state => state.BoardReducer);
    const [editorValue, setEditorValue] = useState('');
    const[form, setForm] = useState({
        // boardTitle과 boardType 초기값 설정
        boardTitle : board && board.boardTitle,
        boardType : board && board.boardType
    });

    useEffect(
        () => {
            // 해당 공지코드로 제목, 분류, 내용을 기본값으로 보여주기 위한 조회 API
            dispatch(callBoardDetailAPI(boardCode));
            // editor 내부에 이미 등록된 내용(html)을 기본값으로 노출시키는 설정 (ref 활용)
            textRef.current?.getInstance().setHTML(board.boardContent);
        },[]
    );

    useEffect(
        () => {
            if(modify?.status === 200) {
                toast.success("공지가 성공적으로 수정되었습니다 :)");
                navigate(`/board/${boardCode}`, { replace : true });
            }
        },[modify]
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
    const updateBoardHandler = () => {

        if(form.boardTitle === '') {
            toast.error("공지의 제목을 입력해주세요 !");
        } else {
            // 서버로 전달 할 FormData형태의 객체 설정
            const formData = new FormData();
            formData.append("boardCode", boardCode);
            formData.append("boardTitle", form.boardTitle);
            formData.append("boardType", form.boardType);
            formData.append("boardContent", form.boardContent);

            dispatch(callBoardModifyAPI(formData));

        }

    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            { board && 
            <>
                <p className={ CommonCSS.pageDirection }>공지사항 ▸ 공지 상세 내용 ▸ 수정</p>
                <div className={ BoardCSS.buttonBox }>
                    <button 
                        className={ BoardCSS.whiteButton }
                        onClick={ () => navigate(-1) }
                    >
                        취소
                    </button>
                    <button 
                        className={ BoardCSS.pinkButton }
                        onClick={ updateBoardHandler }
                    >
                        저장
                    </button>
                </div>
                <div className={ BoardCSS.inputBox }>
                    <input 
                        type="text" 
                        name="boardTitle"
                        defaultValue={board.boardTitle}
                        className={ BoardCSS.inputTitle } placeholder="공지의 제목을 입력해주세요 :)"
                        onChange={ changeInputHandler }
                    />
                    <select 
                        name="boardType"
                        defaultValue={board.boardType}
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
            </> 
            }
        </motion.div>
    );
}

export default BoardModify;