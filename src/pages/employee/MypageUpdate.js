import { useDispatch, useSelector } from 'react-redux';
import MypageCSS from '../../css/Mypageupdate.module.css';
import { useEffect, useRef, useState } from 'react';
import { callGetEmployeeAPI, callPatchEmployeeAPI } from '../../apis/EmployeeAPICalls';
import { useNavigate } from 'react-router-dom';

function MypageUpdate() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { employee } = useSelector(state => state.EmployeeReducer);
  const { modify } = useSelector(state => state.EmployeeReducer);
  const navigate = useNavigate();
  const imageInput = useRef();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
 
   
  /* 읽기모드와 수정모드를 구분 */
  const [modifyMode, setModifyMode] = useState(false);

  useEffect(() => {
    dispatch(callGetEmployeeAPI());
  }, []);

  useEffect(() => {
    if (modify?.status === 200) {
      alert('마이페이지 수정이 완료되었습니다.');
      navigate('/mypage-profile');
    }
  }, [modify]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

/* 파일 첨부 시 동작하는 이벤트 */
const onChangeImageUpload = (e) => {
    const image = e.target.files[0];
    setImage(image);

    // 이미지 url 설정
    const imageUrl = URL.createObjectURL(image);
  setImageUrl(imageUrl);
};


  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({ ...employee.data });
  };

  const onClickMyPageUpdateHandler = () => {
    const formData = new FormData();
    console.log('image', image);
    console.log('form', form);

    formData.append('myPageImage', image);
    formData.append("empName", form.empName);
    formData.append("empNameEn", form.empNameEn);
    formData.append("empEmail", form.empEmail);
    formData.append("empPhone", form.empPhone);
    formData.append("empAddress", form.empAddress);

    dispatch(callPatchEmployeeAPI(formData));
  };

  return (
    <div
      className={MypageCSS.backgroundDiv}
      style={{ backgroundColor: 'white' }}
    >
     
      {!modifyMode && (
        <button
          onClick={onClickModifyModeHandler}
        >
          수정모드
        </button>
      )}
      
      {employee && (
        <div className={MypageCSS.registerDiv}>
            <div>
          <img 
          src={ !imageUrl ? employee.data.profile : imageUrl } 
          alt="preview" />
          <input
            type="file"
            name="myPageImgae"
            accept='image/jpg,image/png,image/jpeg,image/gif'
            onChange={ onChangeImageUpload }
            ref={ imageInput }   
            disabled={ !modifyMode }         
          />
         
            </div>

          <div className={MypageCSS.row}>
            <div className={MypageCSS.column2}>

              <div className={MypageCSS.namebar}>
                <label>이름</label>
                <input
                  name='empName'
                  type="text"
                  readOnly={!modifyMode}
                  placeholder={employee.data.empName}
                  onChange={onChangeHandler}
                  value={!modifyMode ? employee.data.empName : form.empName}
                />
              </div>
              <div className={MypageCSS.Enamebar}>
                <input
                  name="empNameEn"
                  type="text"
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                  placeholder={employee.data.empNameEn}
                  value={!modifyMode ? employee.data.empNameEn : form.empNameEn}
                />
              </div>
            </div>

            <div className={MypageCSS.column}>
              <label htmlFor="employeeName">메일</label>
              <input
                name="empEmail"
                type="text"
                readOnly={!modifyMode}
                placeholder={employee.data.empEmail}
                onChange={onChangeHandler}
                value={!modifyMode ? employee.data.empEmail : form.empEmail}
              />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeEmail">번호</label>
              <input
                name="empPhone"
                type="text"
                readOnly={!modifyMode}
                onChange={onChangeHandler}
                placeholder={employee.data.empPhone}
                value={!modifyMode ? employee.data.empPhone : form.empPhone}
              />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeEmail">주소</label>
              <input
                name="empAddress"
                type="text"
                readOnly={!modifyMode}
                placeholder={employee.data.empAddress}
                onChange={onChangeHandler}

                value={!modifyMode ? employee.data.empAddress : form.empAddress}
              />
            </div>
            <div className={MypageCSS.column3}>
              <input
                id="employeeEmail"
                type="text"
                readOnly={true}
                placeholder={employee.data.employeeEmail}
              />
            </div>
          </div>

          <div className={MypageCSS.row1}>
            <div className={MypageCSS.column}>
              <label>교번</label>
              <input
                type="text"
                readOnly={true}
                value={employee.data.empCode}
              />
            </div>

            <div className={MypageCSS.column}>
              <label htmlFor="employeeName">상태</label>
              <input
                id="employeeName"
                type="text"
                readOnly={true}
                value={employee.data.empStatus}
              />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeEmail">입사</label>
              <input
                id="employeeEmail"
                type="text"
                readOnly={true}
                value={employee.data.empEntDate.substring(0, 10)}
              />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeEmail">소속</label>
              <input
                id="employeeEmail"
                type="text"
                readOnly={true}
                value={employee.data.department.deptName}
              />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeEmail">연차</label>
              <input
                id="employeeEmail"
                type="text"
                readOnly={true}
                value={employee.data.empAnnual}
              />
            </div>
            {modifyMode && (
              <button
              onClick={onClickMyPageUpdateHandler}>
                수정하기
              </button>
            )}
             <button onClick={() => navigate(-1)}>
        돌아가기
      </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MypageUpdate;