import { useNavigate } from 'react-router';
import IdsearchCSS from '../../css/Idsearch.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { callIdAPI, callPwdAPI } from "../../apis/EmployeeAPICalls";
import SearchIdModal from '../modal/SearchIdModal';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';



function PwdSearchForm(){
    
    const dispatch = useDispatch();
    const {pwdsearch } = useSelector(state => state.EmployeeReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();
    const style = {
        story:{
            "margin-top":"20px"
        }
    };



    // 폼데이터 저장
    const[form, setForm] = useState({
        empId:'',
        empEmail:''
    });
    useEffect(() => {
      if (pwdsearch && pwdsearch.status === 500) {
        toast.error(pwdsearch.message);
      }
    }, [pwdsearch]);

    console.log("왓더 헬  :", form)
    useEffect(() => {
        if (pwdsearch && pwdsearch.status === 500) {
          toast.error(pwdsearch.message);
        }
      }, [pwdsearch]);
    
    const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      }
    
      const onClickHandler = async () => {
        const result = await dispatch(callPwdAPI(form));     
        if (result && result.data) { // result가 유효하고 data가 있는지 확인
          navigate("/")
          setSelectedId(result.data);
          setIsModalOpen(true);
          console.log("아아ㅏ : ", result);
      }
    }
     
  
    console.log("? :" ,selectedId);
    const closeModal = () => {
        setSelectedId(null);
        setIsModalOpen(false);
        navigate("/");
      };
    

      const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
          onClickHandler();
        }
      };




    return (
        <>
        <div className={ IdsearchCSS.backgroundDiv }>
            <div className={ IdsearchCSS.loginDiv }>
        <h1>비밀번호 찾기</h1>
        <span>
        <input
            type="text"
            name="empId"
            placeholder="아이디를 입력하세요."
            autoComplete='off'
            onChange={ onChangeHandler }
            onKeyUp={onKeyPressHandler}

        />
        <input
            type="email"
            name="empEmail"
            placeholder="이메일을 입력하세요."
            autoComplete='off'
            onChange={ onChangeHandler }
            onKeyUp={onKeyPressHandler}

        />
        <div style={style.story}>
       <div>회원가입 시 입력하신 이름과 이메일로 인증메일이 발송됩니다.</div>
       <div>정확한 정보를 입력해 주세요.</div>
       </div>
        <button
             onClick={()=>onClickHandler()}
        >
            확인
        </button>
        </span>
        </div>
        </div>
        
 {/* 모달 창 */}
        {isModalOpen && (
                        <SearchIdModal
                   
                        selectedId={selectedId}
                        closeModal={closeModal}
                        />
            )}



    </>
    )


}

export default PwdSearchForm;