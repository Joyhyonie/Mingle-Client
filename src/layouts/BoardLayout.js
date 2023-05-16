import CommonCSS from '../css/common/Common.module.css'
import SearchAndListLayout from './SearchAndListLayout';
import SearchBarCSS from '../css/common/SearchBar.module.css';

function BoardLayout () {

    const options = [
        { value: "title", name: "제목" },
        { value: "content", name: "내용" }
    ];

    return (
        <>
            <p className={ CommonCSS.pageDirection }>공지사항</p>
            <div className={ SearchBarCSS.basic }>
                <SearchAndListLayout options={options}/>
            </div>
        </>
    );
}

export default BoardLayout;