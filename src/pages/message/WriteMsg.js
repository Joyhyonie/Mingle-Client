import { motion } from "framer-motion"
import MessageCSS from '../../css/Message.module.css';
import MessageSelectBar from "../../components/common/MessageSelectBar";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useRef } from "react";

function WriteMsg ({replyContent, selectedDeptCode, selectedEmpCode}) {

    const dispatch = useDispatch();
    const textareaRef = useRef(null); // 내용이 작성되어있는지 확인하기 위한 Ref

    const sendMessageHandler = () => {

        const messageContent = textareaRef.current.value.trim();

        if (!messageContent) {
            toast.error('내용을 입력해주세요 !');
            return;
        }

        /* 쪽지를 등록하는 API */
        // dispatch(callRegistMessageAPI());

        toast.success('쪽지가 정상적으로 전송되었습니다');
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            <MessageSelectBar selectedDeptCode={selectedDeptCode} selectedEmpCode={selectedEmpCode}/>
            <textarea
                className={ MessageCSS.textBox }
                placeholder="내용을 입력해주세요 :)"
                ref={textareaRef}
            >
                {replyContent ? replyContent + '\n\n------------------------------------------\n\n' : null}
            </textarea>
            <button
                className={ MessageCSS.sendButton }
                onClick={ sendMessageHandler }
            >
                전송
            </button>
        </motion.div>
    );
}

export default WriteMsg;