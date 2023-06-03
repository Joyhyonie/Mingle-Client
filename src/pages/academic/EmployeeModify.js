import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { callEmployeeDetailAPI, callEmployeeUpdateAPI } from "../../apis/AcademicAPICalls";
import CommonCSS from "../../css/common/Common.module.css";
import EmployeeModifyCSS from "../../css/EmployeeModify.module.css";
import DaumPostcode from "react-daum-postcode";

function EmployeeModify() {

  const dispatch = useDispatch();
  const params = useParams();
  const empCode = params.empCode;
  const navigate = useNavigate();
  const { Employee, modify } = useSelector(state => state.StaffReducer);
  const [form, setForm] = useState({
    empStatus: "선택",
    empPwd: '$2a$10$COvazywgZPXseeKaYhruh.pAYYfcSeGO5aSrHOsLZN0X8joNwW2dW',
    empAnnual: '12',
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [modifyMode, setModifyMode] = useState(false);
  const imageInput = useRef(); // 이미지 삽입
  const [deptCode, setDeptCode] = useState(); // 
  const [isOpenPost, setIsOpenPost] = useState(false); // 주소 업데이트
  const [errors, setErrors] = useState({});

  /* empCode에 따른 정보 상세 조회 */
  useEffect(
    () => {
      dispatch(callEmployeeDetailAPI(empCode));
    }, [empCode]
  );

  /* deptCode 값 변경 */
  const onChangeDeptCodeHandler = (e) => {
    setDeptCode(e.target.value);
  }

  /* 이미지 업로드 버튼 클릭 이벤트 */
  const onClickImageUpload = () => {
    imageInput.current.click();
  }

  /* 파일 첨부 시 동작하는 이벤트 */
  const onChangeImageUpload = (e) => {
    setImage(e.target.files[0]);
  }

  /* 입력 양식의 값이 변경될 때 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* 칸을 눌렀을 때 팝업이 열리도록 */
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  /* 주소를 서치한 후 성공적으로 주소가 입력 되도록 */
  const onCompletePost = (data) => {
    let fullAddress = data.address;
    setForm({
      ...form,
      empAddress: fullAddress
    });
    setIsOpenPost(false);
  };

  /* formatDate => 데이트 형식 지정 */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  /* 수정버튼 클릭 시 수정모드로 전환 */
  const onClickEditButtonHandler = () => {
    setModifyMode(true);
    setForm(Employee);
  }

  /* 학생 정보 수정 후 modify 값이 확인되면 학생 목록으로 이동 */
  useEffect(() => {
    if (modify?.status === 200) {
      toast.success("교직원 정보 수정이 완료 되었습니다.");
      navigate('/management-employee', { replace: true });
      console.log(modify);
    }
  }, [modify]);

  /* 학생 수정 버튼 클릭 이벤트 */
  const onClickEmployeeUpdateHandler = () => {

    const validations = [
      { key: "empId", message: "ex ) 교직원 : AD0000, 교수 : PF0000 과 같은 형식을 지켜주세요.", customCheck: (value) => !isValidEmpId(value) },
      { key: "empName", message: "성함을 기입해주세요. ☑️" },
      { key: "empNameEn", message: "영문 이름을 기입해주세요. ☑️" },
      { key: "deptCode", message: "부서 코드를 기입해주세요. ☑️" },
      { key: "empEmail", message: "이메일을 기입해주세요. ☑️" },
      { key: "empEmail", message: "이메일은 (아이디)@mingle.ac.kr 형식이어야 합니다.", customCheck: (value) => !isValidEmail(value) },
      { key: "empPhone", message: "전화번호를 기입해주세요. ☑️" },
      { key: "empPhone", message: "전화번호는 010 혹은 011로 시작하는 숫자 형식이어야 합니다.", customCheck: (value) => !isValidPhone(value) },
      { key: "empStatus", message: "상태를 선택해주세요. ☑️", customCheck: (value) => value === "선택" },
      { key: "empSsn", message: "주민등록번호를 기입해주세요. ☑️" },
      { key: "empSsn", message: "올바른 주민등록번호를 입력해주세요. ☑️", customCheck: (value) => !isValidSsn(value) },
      { key: "empAddress", message: "주소를 기입해주세요. ☑️" },
      { key: "empEntDate", message: "입사일을 선택해주세요. ☑️" },
    ];

    // 이메일 유효성 검사 함수
    const isValidEmail = (value) => {
      const emailRegex = /^[^\s@]+@mingle\.ac\.kr$/;
      return emailRegex.test(value);
    };

    // 전화번호 유효성 검사 함수
    const isValidPhone = (value) => {
      const phoneRegex = /^(010|011)\d{7,8}$/;
      return phoneRegex.test(value);
    };

    // 주민등록번호 유효성 검사 함수
    const isValidSsn = (value) => {
      const ssnRegex = /^(0[0-9]|[1-9][0-9])(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])-[1-4]\d{6}$/;
      return ssnRegex.test(value);
    };

    // empId 유효성 검사 함수
    const isValidEmpId = (value) => {
      const empIdRegex = /^(AD|PF)\d{1,4}$/;
      return empIdRegex.test(value);
    };


    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      const value = form[validation.key] || (validation.key === "deptCode" && deptCode);

      if ((!value || (validation.customCheck && validation.customCheck(value))) && validation.message) {
        toast.error(validation.message);
        return;
      }
    }


    const formData = new FormData();
    formData.append("empCode", form.empCode);
    formData.append("empId", form.empId);
    formData.append("empName", form.empName);
    formData.append("empNameEn", form.empNameEn);
    formData.append("empAnnual", form.empAnnual);
    formData.append("department.deptCode", form.deptCode);
    formData.append("empSsn", form.empSsn);
    formData.append("empEmail", form.empEmail);
    formData.append("empPwd", form.empPwd);
    formData.append("empPhone", form.empPhone);
    formData.append("empStatus", form.empStatus);
    formData.append("empAddress", form.empAddress);
    formData.append("empEntDate", formatDate(form.empEntDate));
    if (form.empAbDate) formData.append("empAbDate", formatDate(form.empAbDate));
    if (form.empDropDate) formData.append("empDropDate", formatDate(form.empDropDate));
    if (form.empLeaveDate) formData.append("empLeaveDate", formatDate(form.empLeaveDate));
    console.log('modify form ', form)
    console.log('modify formdata ', formData)

    if (image) {
      formData.append("empProfile", image);
    }

    dispatch(callEmployeeUpdateAPI(formData));
  }

  return (
    <div className={EmployeeModifyCSS.employeeContainer}>

      <div className={EmployeeModifyCSS.employeeClass}>
        {Employee &&
          <div className={EmployeeModifyCSS.employeeHeader}>
            {!modifyMode && <p className={CommonCSS.pageDirection}>학사관리 ▸ 교직원 ▸ 상세 조회</p>}
            {modifyMode && <p className={CommonCSS.pageDirection}>학사관리 ▸ 교직원 ▸ 수정</p>}

            <input
              style={{ display: 'none' }}
              type="file"
              name='empProfile'
              accept='image/jpg, img/png, image/jpeg, image/gif'
              ref={imageInput}
              onChange={onChangeImageUpload}
            />
            <button className={EmployeeModifyCSS.ImageUploadBtn}
              onClick={onClickImageUpload}
              disabled={!modifyMode}
            >
              <img
                className={EmployeeModifyCSS.employeeImageAfter}
                src={(!imageUrl || imageUrl === 'null') ? "/images/person.png" : imageUrl}
                alt="preview"
              />
            </button>

            <div className={EmployeeModifyCSS.employeeModifyInformation}>
              <div className={EmployeeModifyCSS.employeeModifyFormFirst}>
                이름
                <input
                  type="text"
                  name="empName"
                  readOnly={!modifyMode}
                  className={EmployeeModifyCSS.employeeRegistName}
                  value={!modifyMode ? Employee.empName : form.empName}
                  onChange={onChangeHandler}
                />
                영문명
                <input
                  type="text"
                  name="empNameEn"
                  readOnly={!modifyMode}
                  className={EmployeeModifyCSS.employeeRegistNameEn}
                  value={!modifyMode ? Employee.empNameEn : form.empNameEn}
                  onChange={onChangeHandler}
                />
                연차
                <input
                  type="number"
                  name="empAnnual"
                  readOnly={!modifyMode}
                  className={EmployeeModifyCSS.employeeRegistLevel}
                  value={!modifyMode ? Employee.empAnnual : form.empAnnual}
                  onChange={onChangeHandler}
                />
                소속
                <input
                  className={EmployeeModifyCSS.employeeRegistDeptCode}
                  name="deptCode"
                  readOnly={!modifyMode}
                  value={!modifyMode ? Employee.department.deptName : form.deptName}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={EmployeeModifyCSS.employeeRegistFormSecond}>
                이메일
                <input
                  type="text"
                  name="empEmail"
                  readOnly={!modifyMode}
                  className={EmployeeModifyCSS.employeeRegistEmail}
                  value={!modifyMode ? Employee.empEmail : form.empEmail}
                  onChange={onChangeHandler}
                />
                교번
                <input
                  type="text"
                  name="empId"
                  readOnly={!modifyMode}
                  className={EmployeeModifyCSS.employeeRegistId}
                  value={!modifyMode ? Employee.empId : form.empId}
                  onChange={onChangeHandler}
                />
                비밀번호
                <input
                  type="text"
                  name="empPwd"
                  readOnly
                  placeholder="마이페이지에서 확인해주세요"
                  className={EmployeeModifyCSS.employeeRegistPwd}
                />
              </div>
              <div className={EmployeeModifyCSS.employeeRegistFormThird}>
                휴대전화
                <input
                  type="text"
                  name="empPhone"
                  readOnly={!modifyMode}
                  className={EmployeeModifyCSS.employeeRegistPhone}
                  value={!modifyMode ? Employee.empPhone : form.empPhone}
                  onChange={onChangeHandler}
                />
                상태
                <input
                  className={EmployeeModifyCSS.employeeRegistStatus}
                  name="empStatus"
                  readOnly={!modifyMode}
                  value={!modifyMode ? Employee.empStatus : form.empStatus}
                  onChange={onChangeHandler}
                />
                주민등록번호
                <input
                  type="text"
                  name="empSsn"
                  className={EmployeeModifyCSS.employeeRegistSsd}
                  readOnly={!modifyMode}
                  value={!modifyMode ? Employee.empSsn : form.empSsn}
                  onChange={onChangeHandler}
                />
              </div>

              <div className={EmployeeModifyCSS.employeeRegistFormFourth}>
                주소
                <input
                  type="text"
                  name="empAddress"
                  className={EmployeeModifyCSS.employeeRegistAddress}
                  value={!modifyMode ? Employee.empAddress : form.empAddress}
                  onClick={!modifyMode ? () => { } : onChangeOpenPost}
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                />
                {isOpenPost ? (
                  <div className={EmployeeModifyCSS.postCodeStyle}><DaumPostcode autoClose onComplete={onCompletePost} /></div>
                ) : null}
              </div>

              <div className={EmployeeModifyCSS.employeeRegistFormFifth}>
                입사일
                <input
                  type={!modifyMode ? "text" : "date"}
                  name="empEntDate"
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                  className={EmployeeModifyCSS.employeeRegistEntDate}
                  value={!modifyMode ? Employee.empEntDate : form.empEntDate}
                />
                휴직일
                <input
                  type={!modifyMode ? "text" : "date"}
                  name="empAbDate"
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                  className={EmployeeModifyCSS.employeeRegistAbDate}
                  value={!modifyMode ? Employee.empAbDate : form.empAbDate}
                />
                퇴사일
                <input
                  type={!modifyMode ? "text" : "date"}
                  name="empDropDate"
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                  className={EmployeeModifyCSS.employeeRegistDropDate}
                  value={!modifyMode ? Employee.empDropDate : form.empDropDate}
                />
              </div>
              <div className={EmployeeModifyCSS.buttonContainer}>
                {!modifyMode && <button onClick={onClickEditButtonHandler} className={EmployeeModifyCSS.employeeRegistBtn}>수정</button>}
                {modifyMode && <button onClick={onClickEmployeeUpdateHandler} className={EmployeeModifyCSS.employeeRegistBtn}>완료</button>}
                <button onClick={() => navigate(-1)} className={EmployeeModifyCSS.employeeCancelBtn}>취소</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default EmployeeModify;