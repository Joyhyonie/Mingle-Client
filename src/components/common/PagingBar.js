import { useState } from 'react';
import PagingBarCSS from '../../css/common/PagingBar.module.css';

function PagingBar({ pageInfo, setCurrentPage }) {

    const [preIsHovered, setPreIsHovered] = useState(false);
    const [nextIsHovered, setNextIsHovered] = useState(false);

    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <div style={ {listStyleType : 'none', display : 'flex', justifyContent: 'center',marginTop: '30px'} }>
            {pageInfo.currentPage > 1 &&
                <button 
                    style={{ color: preIsHovered ? '#FFFFFF' : '#343434' }}
                    className={ PagingBarCSS.pagingBtn }
                    onClick={ () => setCurrentPage(pageInfo.currentPage - 1) }
                    onMouseEnter={() => setPreIsHovered(true)}
                    onMouseLeave={() => setPreIsHovered(false)}
                >
                    ◀
                </button>
            }
            { pageNumber.map(num => (
                <li key={num} onClick={ () => setCurrentPage(num) }>
                    <button 
                        className={ PagingBarCSS.pagingBtn }
                        style={ pageInfo.currentPage === num ? { backgroundColor : '#343434', border : '1px solid #343434', color: 'white' } : null }
                    >
                        {num}
                    </button>
                </li>
            ))
            }
            {pageInfo.currentPage !== pageInfo.maxPage &&
                <button 
                    style={{ color: nextIsHovered ? '#FFFFFF' : '#343434' }}
                    className={ PagingBarCSS.pagingBtn }
                    onClick={ () => setCurrentPage(pageInfo.currentPage + 1) }
                    disabled={ pageInfo.currentPage >= pageInfo.maxPage }
                    onMouseEnter={() => setNextIsHovered(true)}
                    onMouseLeave={() => setNextIsHovered(false)}
                >
                    ▶
                </button>
            }
        </div>
    );
}

export default PagingBar;