import { useNavigate } from 'react-router';
import IdsearchCSS from '../../css/Idsearch.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { callIdAPI } from "../../apis/EmployeeAPICalls";
import SearchIdModal from '../modal/SearchIdModal';
import { async } from 'q';



function IdSearchForm(){
    
    const dispatch = useDispatch();
    const {employee } = useSelector((state) => state.EmployeeReducer);
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
        empName:'',
        empEmail:''
    });

    
    
    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    // 아이디 찾기 버튼 클릭 
    const onClickHandler = async () => {
        const result = await dispatch(callIdAPI(form));

        setSelectedId(result.data);
        setIsModalOpen(true);
        console.log(result);

    }
      
        
  
    
    const closeModal = () => {
        setSelectedId(null);
        setIsModalOpen(false);
        navigate("/");
      };
    






    return (
        <>
        <div className={ IdsearchCSS.backgroundDiv }>
            <div className={ IdsearchCSS.loginDiv }>
        <h1>아이디 찾기</h1>
        <span>
        <input
            type="text"
            name="empName"
            placeholder="이름을 입력하세요."
            autoComplete='off'
            onChange={ onChangeHandler }
        />
        <input
            type="email"
            name="empEmail"
            placeholder="이메일을 입력하세요."
            autoComplete='off'
            onChange={ onChangeHandler }
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

export default IdSearchForm;