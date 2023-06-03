import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeRegistCss from '../../css/EmployeeRegist.module.css';
import CommonCSS from '../../css/common/Common.module.css';
import { toast } from "react-hot-toast";
import { callEmployeeInsertAPI } from "../../apis/AcademicAPICalls";
import { useNavigate } from 'react-router-dom';
import DaumPostcode from "react-daum-postcode";

function EmployeeRegist() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { regist } = useSelector((state) => state.StaffReducer);
  const [form, setForm] = useState({
    empStatus: "선택",
    empPwd: '$2a$10$COvazywgZPXseeKaYhruh.pAYYfcSeGO5aSrHOsLZN0X8joNwW2dW',
    empAnnual: '12',
  });
  const imageInput = useRef(); // 이미지 삽입
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [deptCode, setDeptCode] = useState(); // 
  const [isOpenPost, setIsOpenPost] = useState(false); // 주소 업데이트
  const [empAddressBase, setEmpAddressBase] = useState('');
  const [errors, setErrors] = useState({});

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
    setEmpAddressBase(fullAddress);
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

  /* 교직원 정보 등록 후 regist 값이 확인되면 학생 목록으로 이동 */
  useEffect(() => {
    if (regist?.status === 200) {
      toast.success("신규 교직원 등록이 완료 되었습니다.");
      navigate('/management-employee', { replace: true });
      console.log(regist);
    }
  }, [regist]);


  /* image 값이 변경될 때마다 preview 랜더링 */
  useEffect(
    () => {
      if (image) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) setImageUrl(result);
        }
        fileReader.readAsDataURL(image);
      }
    },
    [image]
  );


  /* 학생 등록 버튼 클릭 이벤트 */
  const onClickEmployeeRegistHandler = () => {

    const validations = [
      { key: "empId", message: "ex ) 교직원 : AD0000, 교수 : PF0000 과 같은 형식을 지켜주세요.", customCheck: (value) => !isValidEmpId(value)},
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
    // formData.append("empCode", form.empCode);
    formData.append("empId", form.empId);
    formData.append("empName", form.empName);
    formData.append("empNameEn", form.empNameEn);
    formData.append("empAnnual", form.empAnnual);
    formData.append("department.deptCode", deptCode);
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
    console.log('regist form ', form)
    console.log('regist formdata ', formData)

    if (image) {
      formData.append("empProfile", image);
    }

    dispatch(callEmployeeInsertAPI(formData));
  }

  return (
    <div className={EmployeeRegistCss.employeeContainer}>
      <div className={EmployeeRegistCss.employeeClass}>
        <div className={EmployeeRegistCss.employeeHeader}>
          <p className={CommonCSS.pageDirection}>학사관리 ▸ 교직원 ▸ 등록</p>
          {imageUrl && (
            <img
              className={EmployeeRegistCss.employeeImageAfter}
              alt="preview"
              src={imageUrl}
            />
          )}
          {!imageUrl && (
            <button className={EmployeeRegistCss.ImageUploadBtn}
              onClick={onClickImageUpload}><img
                className={EmployeeRegistCss.employeeImageBefore}
                alt="preview"
                src="/images/person.png"
              /></button>
          )}
          <input
            style={{ display: 'none' }}
            type="file"
            name='empProfile'
            accept='image/jpg, img/png, image/jpeg, image/gif'
            ref={imageInput}
            onChange={onChangeImageUpload}
          />

        </div>
        <div className={EmployeeRegistCss.employeeRegistInformation}>
          <div className={EmployeeRegistCss.employeeRegistFormFirst}>
            이름
            <input
              type="text"
              name="empName"
              className={EmployeeRegistCss.employeeRegistName}
              onChange={onChangeHandler}
            />
            영문명
            <input
              type="text"
              name="empNameEn"
              className={EmployeeRegistCss.employeeRegistNameEn}
              onChange={onChangeHandler}
            />
            연차
            <input
              type="number"
              name="empAnnual"
              readOnly
              className={EmployeeRegistCss.employeeRegistLevel}
              value={form.empAnnual}
            />
            소속
            <select className={EmployeeRegistCss.employeeRegistDeptCode} name="deptCode" onChange={onChangeDeptCodeHandler} value={deptCode}>
              <option value="선택">선택</option>
              <option value="13" onChange={onChangeDeptCodeHandler}>IT공학과</option>
              <option value="14" onChange={onChangeDeptCodeHandler}>간호학과</option>
              <option value="15" onChange={onChangeDeptCodeHandler}>경제학과</option>
              <option value="16" onChange={onChangeDeptCodeHandler}>경영학과</option>
              <option value="17" onChange={onChangeDeptCodeHandler}>환경공학과</option>
              <option value="18" onChange={onChangeDeptCodeHandler}>외식조리학과</option>
              <option value="19" onChange={onChangeDeptCodeHandler}>아동교육학과</option>
              <option value="20" onChange={onChangeDeptCodeHandler}>시각디자인학과</option>
              <option value="21" onChange={onChangeDeptCodeHandler}>교무처</option>
              <option value="22" onChange={onChangeDeptCodeHandler}>학생처</option>
              <option value="23" onChange={onChangeDeptCodeHandler}>입학처</option>
              <option value="24" onChange={onChangeDeptCodeHandler}>취업처</option>
              <option value="25" onChange={onChangeDeptCodeHandler}>총무처</option>
            </select>
          </div>
          <div className={EmployeeRegistCss.employeeRegistFormSecond}>
            이메일
            <input
              type="text"
              name="empEmail"
              className={EmployeeRegistCss.employeeRegistEmail}
              onChange={onChangeHandler}
            />
            교번
            <input
              type="text"
              name="empId"
              className={EmployeeRegistCss.employeeRegistId}
              onChange={onChangeHandler}
            />
            비밀번호
            <input
              type="text"
              name="empPwd"
              readOnly
              className={EmployeeRegistCss.employeeRegistPwd}
              placeholder='자동기입! 추후 수정 가능'>
            </input>
          </div>
          <div className={EmployeeRegistCss.employeeRegistFormThird}>
            휴대전화
            <input
              type="text"
              name="empPhone"
              placeholder='숫자만 입력하세요.'
              className={EmployeeRegistCss.employeeRegistPhone}
              onChange={onChangeHandler}
            />
            상태
            <select className={EmployeeRegistCss.employeeRegistStatus} name="empStatus" onChange={onChangeHandler} value={form.empStatus}>
              <option value="선택">선택</option>
              <option value="재직" onChange={onChangeHandler}>재직</option>
              <option value="휴직" onChange={onChangeHandler}>휴직</option>
              <option value="퇴직" onChange={onChangeHandler}>퇴직</option>
            </select>
            주민등록번호
            <input
              type="text"
              name="empSsn"
              className={EmployeeRegistCss.employeeRegistSsd}
              onChange={onChangeHandler}
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
              readOnly
            />
            {isOpenPost ? (
              <div className={EmployeeRegistCss.postCodeStyle}><DaumPostcode autoClose onComplete={onCompletePost} /></div>
            ) : null}
          </div>

          <div className={EmployeeRegistCss.employeeRegistFormFifth}>
            입사일
            <input
              type="date"
              name="empEntDate"
              className={EmployeeRegistCss.employeeRegistEntDate}
              onChange={onChangeHandler}
            />
            휴직일
            <input
              type="date"
              name="empAbDate"
              className={EmployeeRegistCss.employeeRegistAbDate}
              onChange={onChangeHandler}
            />
            퇴사일
            <input
              type="date"
              name="empDropDate"
              className={EmployeeRegistCss.employeeRegistDropDate}
              onChange={onChangeHandler}
            />
          </div>
          <div className={EmployeeRegistCss.buttonContainer}>
            <button onClick={onClickEmployeeRegistHandler} className={EmployeeRegistCss.employeeRegistBtn}>등록</button>
            <button onClick={() => navigate(-1)} className={EmployeeRegistCss.employeeCancelBtn}>취소</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeRegist;