import IdsearchCSS from '../../css/Idsearch.module.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SearchPwdModal from '../modal/SearchPwdModal';
import { callPwdAPI } from "../../apis/EmployeeAPICalls";

function PwdSearchForm() {
  const style = {
    story: {
      "margin-top": "20px"
    }
  };

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedName] = useState(null);
  const navigate = useNavigate();

  // 폼데이터 저장
  const [form, setForm] = useState({
    empId: '',
    empEmail: ''
  });

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 아이디 찾기 버튼 클릭 
  const onClickHandler = async () => {
    const result = await dispatch(callPwdAPI(form));
    if (result && result.data) {
      setSelectedName(result.data);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedName(null);
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <div className={IdsearchCSS.backgroundDiv}>
        <div className={IdsearchCSS.loginDiv}>
          <h1>비밀번호 찾기</h1>
          <span>
            <input
              type="text"
              name="empId"
              placeholder="아이디를 입력하세요."
              autoComplete='off'
              onChange={onChangeHandler}
            />
            <input
              type="email"
              name="empEmail"
              placeholder="이메일을 입력하세요."
              autoComplete='off'
              onChange={onChangeHandler}
            />
            <div style={style.story}>
              <div>회원가입 시 입력하신 이메일로 임시 비밀번호가 발송됩니다.</div>
              <div>정확한 정보를 입력해 주세요.</div>
            </div>
            <button onClick={onClickHandler}>이메일 전송</button>
          </span>
        </div>
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <SearchPwdModal

        selectedId={selectedId}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default PwdSearchForm;
