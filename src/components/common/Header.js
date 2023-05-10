import CommonCSS from '../../css/common/Common.module.css'

function Header () {

    return (
        <>
            <div className={ CommonCSS.headerBox }>
                <p 
                    className={ CommonCSS.logo }
                >
                    <span>M</span>ingle
                </p>
            </div>
        </>
    );
}

export default Header;