import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { callEmployeeDetailAPI, callEmployeeUpdateAPI } from "../../apis/AcademicAPICalls";
import { toast } from "react-hot-toast";
import CommonCSS from "../../css/common/Common.module.css";
import EmployeeRegistCss from "../../css/StudentRegist.module.css";
import DaumPostcode from "react-daum-postcode";

function EmployeeModify({ acEmployee }) {

  const { empCode } = useParams();
  const { modify } = useSelector(state => state.EmployeeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageInput = useRef();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [form, setForm] = useState({});
  const [deptCode, setDeptCode] = useState(); // 

  const [isOpenPost, setIsOpenPost] = useState(false); // 주소 업데이트

  /* 1. 읽기모드와 수정모드 구분 */
  const [modifyMode, setModifyMode] = useState(false);

  /* 2. 수정 모드 변경 이벤트 */
  const onClickModifyHandler = (e) => {
    setModifyMode(true);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* deptCode 값 변경 */
  const onChangeDeptCodeHandler = (e) => {
    setDeptCode(e.target.value);
  }

  /* 주소를 서치한 후 성공적으로 주소가 입력 되도록 */
  const onCompletePost = (data) => {
    let fullAddress = data.address;
    // setStdAddressBase(fullAddress);
    setForm({
      ...form,
      stdAddress: fullAddress
    });
    setIsOpenPost(false);
  };


  /* 최초 랜더링 시 교직원 상세 정보 조회 */
  useEffect(() => {
    dispatch(callEmployeeDetailAPI({ empCode }));
  }, []);

  /* 최초 랜더링 시 이미지 조회 */
  useEffect(() => {
    if (image) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          setImageUrl(result);
        }
      }
      fileReader.readAsDataURL(image);
    }
  },
    [image]
  );

  /* 상세 정보 수정 완료 시, 페이지이동과 수정완료 메시지 */
  useEffect(
    () => {
      if (modify?.status === 200) {
        toast.success("교직원 정보 수정이 완료 되었습니다.");
        navigate('/management-employee', { replace: true });
      }
    },
    [modify]
  )

  /* 입력 양식의 값 변경될 때 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  /* 칸을 눌렀을 때 팝업이 열리도록 */
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  /* 이미지 첨부 버튼 클릭 이벤트 */
  const onClickImageUpload = () => {
    imageInput.current.click();
  }

  /* 파일 첨부 시 동작하는 이벤트 */
  const onChangeImageUpload = (e) => {
    const image = e.target.files[0];
    setImage(image);
  }

  /* 상품 수정 저장 버튼 클릭 이벤트 */
  const onClickEmployeeUpdateHandler = () => {

    const formData = new FormData();

    formData.append("empCode", form.empCode);
    formData.append("empId", form.empId);
    formData.append("empName", form.empName);
    formData.append("empNameEn", form.empNameEn);
    formData.append("empEmail", form.empEmail);
    formData.append("empPhone", form.empPhone);
    formData.append("empAddress", form.empAddress);
    formData.append("empEntDate", form.empEntDate);
    if (form.empAbDate) formData.append("empAbDate", form.empAbDate);
    if (form.empLeaveDate) formData.append("empLeaveDate", form.empLeaveDate);
    formData.append("empStatus", form.empStatus);
    formData.append("department.deptCode", form.department.deptCode);
    formData.append("empPwd", form.empPwd);
    formData.append("empSsn", formData.empSsn);
    formData.append("empAnnual", formData.empAnnual);

    if (image) {
      formData.append("empProfile", image);
    }

    console.log('modify form ', form)
    console.log('modify formdata ', formData)

    dispatch(callEmployeeUpdateAPI(formData));
  }



  return (
    <div className={EmployeeRegistCss.employeeContainer}>
      <div className={EmployeeRegistCss.employeeClass}>
        <div className={EmployeeRegistCss.employeeHeader}>
          <p className={CommonCSS.pageDirection}>학사관리 ▸ 교직원 ▸ 수정</p>
          {!modifyMode && <p className={CommonCSS.pageDirection}>학사관리 ▸ 교직원 ▸ 상세 조회</p>}
          <img
            className={EmployeeRegistCss.employeeImageAfter}
            alt="preview"
            src={imageUrl}
          />
          <button className={EmployeeRegistCss.ImageUploadBtn}
            onClick={onClickImageUpload}><img
              className={EmployeeRegistCss.employeeImageBefore}
              alt="preview"
              src="/images/person.png"
            /></button>
          <input
            style={{ display: 'none' }}
            type="file"
            name='empProfile'
            accept='image/jpg, img/png, image/jpeg, image/gif'
            ref={imageInput}
            onChange={onChangeImageUpload}
          />

          <div className={EmployeeRegistCss.buttonContainer}>
            {modifyMode && <button onClick={onClickEmployeeUpdateHandler} className={EmployeeRegistCss.employeeRegistBtn}>저장</button>}
            {!modifyMode && <button onClick={onClickModifyHandler}>수정</button>}
            <button onClick={() => navigate(-1)} className={EmployeeRegistCss.employeeCancelBtn}>취소</button>
          </div>

        </div>
        <div className={EmployeeRegistCss.employeeRegistInformation}>
          <div className={EmployeeRegistCss.employeeRegistFormFirst}>
            이름
            <input
              type="text"
              name="empName"
              className={EmployeeRegistCss.employeeRegistName}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
            영문명
            <input
              type="text"
              name="empNameEn"
              className={EmployeeRegistCss.employeeRegistNameEn}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
            연차
            <input
              type="number"
              name="empAnnual"
              className={EmployeeRegistCss.employeeRegistLevel}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
            소속
            <input
              type="text"
              name="deptCode"
              className={EmployeeRegistCss.employeeRegistDeptCode}
              onChange={onChangeDeptCodeHandler}
              readOnly={!modifyMode}
            />
          </div>
          <div className={EmployeeRegistCss.employeeRegistFormSecond}>
            이메일
            <input
              type="text"
              name="empEmail"
              className={EmployeeRegistCss.employeeRegistEmail}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
            교번
            <input
              type="text"
              name="empId"
              className={EmployeeRegistCss.employeeRegistId}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
            비밀번호
            <input
              type="text"
              name="empPwd"
              className={EmployeeRegistCss.employeeRegistPwd}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
          </div>
          <div className={EmployeeRegistCss.employeeRegistFormThird}>
            휴대전화
            <input
              type="tel"
              name="empPhone"
              className={EmployeeRegistCss.employeeRegistPhone}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
            상태
            <select className={EmployeeRegistCss.employeeRegistStatus} name="stdStatus" onChange={onChangeHandler} value={form.stdStatus}>
              <option value="1" onChange={onChangeHandler}>재직</option>
              <option value="2" onChange={onChangeHandler}>휴직</option>
              <option value="3" onChange={onChangeHandler}>퇴직</option>
            </select>
            주민등록번호
            <input
              type="text"
              name="empSsn"
              className={EmployeeRegistCss.employeeRegistSsd}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
          </div>

          <div className={EmployeeRegistCss.employeeRegistFormFourth}>
            주소
            <input
              type="text"
              name="empAddress"
              className={EmployeeRegistCss.employeeRegistAddress}
              value={form.empAddress} // value
              onClick={onChangeOpenPost}
              readOnly={!modifyMode}
            />
            {isOpenPost ? (
              <div className={EmployeeRegistCss.postCodeStyle}><DaumPostcode autoClose onComplete={onCompletePost} /></div>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              name="empAddressDetail"
              className={EmployeeRegistCss.employeeRegistAddressDetail}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
          </div>
          <div className={EmployeeRegistCss.employeeRegistFormFifth}>
            입사일
            <input
              type="date"
              name="empEntDate"
              className={EmployeeRegistCss.employeeRegistEntDate}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
            휴직일
            <input
              type="date"
              name="empAbDate"
              className={EmployeeRegistCss.employeeRegistAbDate}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
            퇴사일
            <input
              type="date"
              name="empDropDate"
              className={EmployeeRegistCss.employeeRegistDropDate}
              onChange={onChangeHandler}
              readOnly={!modifyMode}
            />
          </div>
        </div>
      </div>
    </div>
  );


}

export default EmployeeModify;
