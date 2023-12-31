import { motion } from "framer-motion"
import MyCertiDocCSS from '../../css/MyCertiDoc.module.css';
import CommonCSS from "../../css/common/Common.module.css";
import PagingBar from "../../components/common/PagingBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMyCertiDocListAPI, callMyCertiDocSearchName } from "../../apis/CertiDocAPICalls";
import CareerCerti from "../../components/documents/CareerCerti";
import EmploymentCerti from "../../components/documents/EmploymentCerti";
import LectureExperienceCerti from "../../components/documents/LectureExperienceCerti";
import SearchBarCss from "../../css/common/SearchBar.module.css";
import SearchBar from "../../components/common/SearchBar";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

/* 모든 교직원의 '증명서 발급 이력' */

function MyCertiDoc () {

    const options = [
        { value: "certiFormName", label: "증명서종류" }
    ];

    const {certi,myCertiSearchName} = useSelector(state => state.CertiReducer);
    const type = "myCertiDoc";
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectCerti, setSelectCerti] = useState();
    const dispatch = useDispatch();
    const [params] = useSearchParams();
    const condition = params.get('condition');
    const name = params.get('search');
    useEffect(
        ()=>{
            if(name){
                dispatch(callMyCertiDocSearchName({search : name, condition: condition, currentPage : currentPage }));
                return;
            }
            dispatch(callMyCertiDocListAPI({currentPage}));
        },
        [currentPage,condition,name,isModalOpen]
    )

    const openModal = (myCerti) => {
        setSelectCerti(myCerti);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectCerti(null);
      };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div>
                <p className={ CommonCSS.pageDirection }>증명서 ▸ 증명서 발급 신청 이력</p>
            </div>
            <div className={SearchBarCss.basic}>
            {<SearchBar options={options} type={type}/>}
           </div>
            <div className={MyCertiDocCSS.MyCertiDocCSS}>
                <table className={MyCertiDocCSS.MyCertiDocCSSTable}>
                    <colgroup>
                    <col width="20%"/>
                    <col width="10%"/>
                    <col width="20%"/>
                    <col width="13%"/>
                    <col width="30%"/>
                    <col width="20%"/>                                        
                    <col width="10%"/>                                       
                    </colgroup>
                    <thead>
                        <tr>
                            <th>문서코드</th>
                            <th>신청일자</th>
                            <th>증명서종류</th>
                            <th>용도</th>
                            <th>사유</th>
                            <th>상태</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (myCertiSearchName && myCertiSearchName.data) ? (
                            myCertiSearchName.data.map((myCerti) => (
                                <tr key={myCerti.certiDocCode}>
                                <td>{myCerti.certiDocCode}</td>
                                <td>{myCerti.certiApplyDate.split(" ")[0]}</td>
                                <td>{myCerti.certiForm.certiFormName}</td>
                                <td>{myCerti.certiUse}</td>
                                <td>{myCerti.reason}</td>
                                <td>{myCerti.docStatus}</td>
                                {myCerti.docStatus == "승인" ? (
                                <td><button onClick={()=> openModal(myCerti)}>보기</button></td>
                                ): null }
                                </tr>
                            ))
                        ) : (
                            (certi && certi.data) && (
                            certi.data.map((myCerti) => (
                                <tr key={myCerti.certiDocCode}>
                                <td>{myCerti.certiDocCode}</td>
                                <td>{myCerti.certiApplyDate.split(" ")[0]}</td>
                                <td>{myCerti.certiForm.certiFormName}</td>
                                <td>{myCerti.certiUse}</td>
                                <td>{myCerti.reason}</td>
                                <td>{myCerti.docStatus}</td>
                                {myCerti.docStatus == "승인" ? (
                                <td><button onClick={()=> openModal(myCerti)}>보기</button></td>
                                ): null }
                                </tr>
                            ))
                            )
                        )
                        }
                    </tbody>
                </table>
                {isModalOpen && selectCerti && (
              <>
              {selectCerti.certiForm.certiFormCode == 300001 && (
                <EmploymentCerti closeModal={closeModal} myCerti={selectCerti}/>
              )}
              {selectCerti.certiForm.certiFormCode == 300002 &&(
                <CareerCerti closeModal={closeModal} myCerti={selectCerti}/>
              )}
              {selectCerti.certiForm.certiFormCode == 300003 &&(
                <LectureExperienceCerti closeModal={closeModal} myCerti={selectCerti}/>
              )}
              </>
      )}
            </div>
            <div>
            { (myCertiSearchName && myCertiSearchName.pageInfo) ? (<PagingBar pageInfo={myCertiSearchName.pageInfo} setCurrentPage={setCurrentPage} /> ) 
                : (certi && certi.pageInfo) ? (<PagingBar pageInfo={certi.pageInfo} setCurrentPage={setCurrentPage} /> )
                : null }
            </div>
        </motion.div>
    );
}

export default MyCertiDoc;