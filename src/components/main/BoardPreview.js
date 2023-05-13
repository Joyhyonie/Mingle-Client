/* 메인에서의 공지사항 미리보기 */
import MainCSS from "../../css/Main.module.css"

function BoardPreview () {

    const boardItemClickHandler = () => {
        console.log('해당 공지사항의 상세 페이지로 이동하는 함수!')
    }

    /* (임시용) API에서 넘어온 DATE 문자열을 포맷하기 위한 테스트 */
    const dateString = '2023-05-18T10:30:00Z';
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}`;

    /* (암시용) 공지사항명이 18자 이상일 경우 그 뒤는 ...으로 화면에 노출되게끔 하기 위한 테스트 */
    const text = '[교외장학] 앤코이교육재단 23년도 희망장학생 선발 안내';

    return (
        <div className={ MainCSS.boardBox }>
            <div className={ MainCSS.boardTitleBox }>
                <p>공지사항</p>
            </div>
            <div className={ MainCSS.boardListBox }>
                <div 
                    className={ MainCSS.boardItemBox }
                    onDoubleClick={ boardItemClickHandler }
                >
                    <p>21234</p>
                    <p style={{fontWeight:'bold'}}>장학</p>
                    <p>{ text.length > 20 ? text.slice(0, 18) + '...' : text }</p>
                    <p>{formattedDate}</p>
                </div>

                {/*  ---------------- 아래부터는 dummy data ----------------  */}

                <div className={ MainCSS.boardItemBox }>
                    <p>21234</p>
                    <p style={{fontWeight:'bold'}}>장학</p>
                    <p>{ text.length > 20 ? text.slice(0, 18) + '...' : text }</p>
                    <p>{formattedDate}</p>
                </div>
                <div className={ MainCSS.boardItemBox }>
                    <p>21234</p>
                    <p style={{fontWeight:'bold'}}>장학</p>
                    <p>{ text.length > 20 ? text.slice(0, 18) + '...' : text }</p>
                    <p>{formattedDate}</p>
                </div>
                <div className={ MainCSS.boardItemBox }>
                    <p>21234</p>
                    <p style={{fontWeight:'bold'}}>장학</p>
                    <p>{ text.length > 20 ? text.slice(0, 18) + '...' : text }</p>
                    <p>{formattedDate}</p>
                </div>

                <div className={ MainCSS.boardItemBox }>
                    <p>21234</p>
                    <p style={{fontWeight:'bold'}}>장학</p>
                    <p>{ text.length > 20 ? text.slice(0, 18) + '...' : text }</p>
                    <p>{formattedDate}</p>
                </div>
                <div className={ MainCSS.boardItemBox }>
                    <p>21234</p>
                    <p style={{fontWeight:'bold'}}>장학</p>
                    <p>{ text.length > 20 ? text.slice(0, 18) + '...' : text }</p>
                    <p>{formattedDate}</p>
                </div>
            </div>
        </div>
    );
}

export default BoardPreview;