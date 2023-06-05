import { useDispatch, useSelector } from 'react-redux';
import MypageCSS from '../../css/Mypageupdate.module.css';
import { useEffect, useRef, useState } from 'react';
import { callGetEmployeeAPI, callPatchEmployeeAPI } from '../../apis/EmployeeAPICalls';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function MypageUpdate({ closeModal, modifyMode }) {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { employee } = useSelector(state => state.EmployeeReducer);
  const { modify } = useSelector(state => state.EmployeeReducer);
  const navigate = useNavigate();
  const imageInput = useRef();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');



  const fileInputRef = useRef(null);
  useEffect(() => {
    dispatch(callGetEmployeeAPI());
  }, [dispatch]);

  useEffect(() => {
    if (modify?.status === 200) {
      toast.success('마이페이지 수정이 완료되었습니다.');
      closeModal(false);
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

    // formData에 myPageImage 설정
    const formData = new FormData();
    formData.append('myPageImage', image);
    setForm(formData);
  };


  const onClickMyPageUpdateHandler = () => {
    const formData = new FormData();
    console.log('image', image);
    console.log('form', form);

    formData.append("empName", form.empName || employee.empName);
    formData.append("empNameEn", form.empNameEn || employee.empNameEn);
    formData.append("empEmail", form.empEmail || employee.empEmail);
    formData.append("empPhone", form.empPhone || employee.empPhone);
    formData.append("empAddress", form.empAddress || employee.empAddress);


    if (image) {
      formData.append('myPageImage', image);
    }
    dispatch(callPatchEmployeeAPI(formData));
  };

  const onClickFileInput = () => {
    imageInput.current.click();
  };
  return (
    <div className={MypageCSS.modal} >
      <div
        className={MypageCSS.backgroundDiv}
        style={{ backgroundColor: 'white' }}
      >



        {employee && (
          <div className={MypageCSS.registerDiv}>
            <div>
              <img
                src={!imageUrl ? employee.profile : imageUrl}

                onClick={onClickFileInput}
              />
              <input
                type="file"
                name="myPageImage"
                accept='image/jpg,image/png,image/jpeg,image/gif'
                onChange={onChangeImageUpload}
                ref={imageInput}
                disabled={!modifyMode}
                style={{ display: 'none' }}
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
                    placeholder={employee.empName}
                    onChange={onChangeHandler}
                    value={!modifyMode ? employee.empName : form.empName}
                  />
                </div>
                <div className={MypageCSS.Enamebar}>
                  <input
                    name="empNameEn"
                    type="text"
                    readOnly={!modifyMode}
                    onChange={onChangeHandler}
                    placeholder={employee.empNameEn}
                    value={!modifyMode ? employee.empNameEn : form.empNameEn}
                  />
                </div>
              </div>

              <div className={MypageCSS.column}>
                <label htmlFor="employeeName">메일</label>
                <input
                  name="empEmail"
                  type="text"
                  readOnly={!modifyMode}
                  placeholder={employee.empEmail}
                  onChange={onChangeHandler}
                  value={!modifyMode ? employee.empEmail : form.empEmail}
                />
              </div>
              <div className={MypageCSS.column}>
                <label htmlFor="employeeEmail">번호</label>
                <input
                  name="empPhone"
                  type="text"
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                  placeholder={employee.empPhone}
                  value={!modifyMode ? employee.empPhone : form.empPhone}
                />
              </div>
              <div className={MypageCSS.column}>
                <label htmlFor="employeeEmail">주소</label>
                <input
                  name="empAddress"
                  type="text"
                  readOnly={!modifyMode}
                  placeholder={employee.empAddress}
                  onChange={onChangeHandler}

                  value={!modifyMode ? employee.empAddress : form.empAddress}
                />
              </div>
              <div className={MypageCSS.column3}>
                <input
                  id="employeeEmail"
                  type="text"
                  readOnly={true}
                  placeholder={employee.employeeEmail}
                />
              </div>


              <div className={MypageCSS.buttonContainer}>
                {modifyMode && (
                  <button
                    onClick={onClickMyPageUpdateHandler}>
                    수정하기
                  </button>
                )}
                <button onClick={() => closeModal(false)}>
                  돌아가기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}



export default MypageUpdate;