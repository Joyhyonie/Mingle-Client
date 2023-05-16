import PagingBarCSS from '../../css/common/PagingBar.module.css';

function PagingBar({ pageInfo, setCurrentPage }) {

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
                    style={{color: '#666666'}}
                    className={ PagingBarCSS.pagingBtn }
                    onClick={ () => setCurrentPage(pageInfo.currentPage - 1) }
                >
                    ◀
                </button>
            }
            { pageNumber.map(num => (
                <li key={num} onClick={ () => setCurrentPage(num) }>
                    <button 
                        className={ PagingBarCSS.pagingBtn }
                        style={ pageInfo.currentPage === num ? { backgroundColor : '#FF9797', border : '1px solid #FF9797', color: 'white' } : null }
                    >
                        {num}
                    </button>
                </li>
            ))
            }
            {pageInfo.currentPage !== pageInfo.maxPage &&
                <button 
                    style={{color: '#666666'}}
                    className={ PagingBarCSS.pagingBtn }
                    onClick={ () => setCurrentPage(pageInfo.currentPage + 1) }
                    disabled={ pageInfo.currentPage >= pageInfo.maxPage }
                >
                    ▶
                </button>
            }
        </div>
    );
}

export default PagingBar;