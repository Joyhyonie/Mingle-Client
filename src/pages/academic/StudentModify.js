import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { callStudentDetailAPI, callStudentUpdateAPI } from "../../apis/AcademicAPICalls";
import CommonCSS from "../../css/common/Common.module.css";
import StudentRegistCSS from "../../css/StudentRegist.module.css";
import DaumPostcode from "react-daum-postcode";

function StudentModify() {

  const dispatch = useDispatch();
  const params = useParams();
  const stdCode = params.stdCode;
  const navigate = useNavigate();
  const { Student, modify } = useSelector(state => state.StudentReducer);
  const [form, setForm] = useState({
    stdStatus: "선택",
    stdPwd: '$2a$10$COvazywgZPXseeKaYhruh.pAYYfcSeGO5aSrHOsLZN0X8joNwW2dW',
    stdLevel: '1',
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [modifyMode, setModifyMode] = useState(false);
  const imageInput = useRef(); // 이미지 삽입
  const [deptCode, setDeptCode] = useState(); // 
  const [isOpenPost, setIsOpenPost] = useState(false); // 주소 업데이트

  /* stdCode에 따른 정보 상세 조회 */
  useEffect(
    () => {
      dispatch(callStudentDetailAPI(stdCode));
    }, []
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
      stdAddress: fullAddress
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
    setForm(Student);
  }

  /* 학생 정보 수정 후 modify 값이 확인되면 학생 목록으로 이동 */
  useEffect(() => {
    if (modify?.status === 200) {
      toast.success("학생 정보 수정이 완료 되었습니다.");
      navigate('/management-student', { replace: true });
      console.log(Student);
    }
  }, [modify]);

  /* 학생 수정 버튼 클릭 이벤트 */
  const onClickStudentUpdateHandler = () => {

    const validations = [
      { key: "stdName", message: "성함을 기입해주세요. ☑️" },
      { key: "stdNameEn", message: "영문 이름을 기입해주세요. ☑️" },
      { key: "deptCode", message: "부서 코드를 기입해주세요. ☑️" },
      { key: "stdEmail", message: "이메일을 기입해주세요. ☑️" },
      { key: "stdEmail", message: "이메일은 (아이디)@mingle.ac.kr 형식이어야 합니다.", customCheck: (value) => !isValidEmail(value) },
      { key: "stdPhone", message: "전화번호를 기입해주세요. ☑️" },
      { key: "stdPhone", message: "전화번호는 010 혹은 011로 시작하는 숫자 형식이어야 합니다.", customCheck: (value) => !isValidPhone(value) },
      { key: "stdStatus", message: "상태를 선택해주세요. ☑️", customCheck: (value) => value === "선택" },
      { key: "stdSsn", message: "주민등록번호를 기입해주세요. ☑️" },
      { key: "stdSsn", message: "올바른 주민등록번호를 입력해주세요. ☑️", customCheck: (value) => !isValidSsn(value) },
      { key: "stdAddress", message: "주소를 기입해주세요. ☑️" },
      { key: "stdEntDate", message: "입사일을 선택해주세요. ☑️" },
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


    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      const value = form[validation.key] || (validation.key === "deptCode" && deptCode);

      if ((!value || (validation.customCheck && validation.customCheck(value))) && validation.message) {
        toast.error(validation.message);
        return;
      }
    }


    const formData = new FormData();
    formData.append("stdCode", form.stdCode);
    formData.append("stdName", form.stdName);
    formData.append("stdNameEn", form.stdNameEn);
    formData.append("stdLevel", form.stdLevel);
    formData.append("department.deptCode", form.deptCode);
    formData.append("stdSsn", form.stdSsn);
    formData.append("stdEmail", form.stdEmail);
    formData.append("stdPwd", form.stdPwd);
    formData.append("stdPhone", form.stdPhone);
    formData.append("stdStatus", form.stdStatus);
    formData.append("stdAddress", form.stdAddress);
    formData.append("stdEntDate", formatDate(form.stdEntDate));
    if (form.stdAbDate) formData.append("stdAbDate", formatDate(form.stdAbDate));
    if (form.stdDropDate) formData.append("stdDropDate", formatDate(form.stdDropDate));
    if (form.stdLeaveDate) formData.append("stdLeaveDate", formatDate(form.stdLeaveDate));
    console.log('modify form ', form)
    console.log('modify formdata ', formData)

    if (image) {
      formData.append("stdProfile", image);
    }

    dispatch(callStudentUpdateAPI(formData));
  }

  return (
    <div className={StudentRegistCSS.studentContainer}>

      <div className={StudentRegistCSS.studentClass}>
        {Student &&
          <div className={StudentRegistCSS.studentHeader}>
            {!modifyMode && <p className={CommonCSS.pageDirection}>학사관리 ▸ 학생 ▸ 상세 조회</p>}
            {modifyMode && <p className={CommonCSS.pageDirection}>학사관리 ▸ 학생 ▸ 수정</p>}

            <input
              style={{ display: 'none' }}
              type="file"
              name='stdProfile'
              accept='image/jpg, img/png, image/jpeg, image/gif'
              ref={imageInput}
              onChange={onChangeImageUpload}
            />
            <button className={StudentRegistCSS.ImageUploadBtn}
              onClick={onClickImageUpload}
              disabled={!modifyMode}
            >
              <img
                className={StudentRegistCSS.studentImageAfter}
                src={(!imageUrl || imageUrl === 'null') ? "/images/person.png" : imageUrl}
                alt="preview"
              />
            </button>

            <div className={StudentRegistCSS.studentRegistInformation}>
              <div className={StudentRegistCSS.studentRegistFormFirst}>
                이름
                <input
                  type="text"
                  name="stdName"
                  readOnly={!modifyMode}
                  className={StudentRegistCSS.studentRegistName}
                  value={!modifyMode ? Student.stdName : form.stdName}
                  onChange={onChangeHandler}
                />
                영문명
                <input
                  type="text"
                  name="stdNameEn"
                  readOnly={!modifyMode}
                  className={StudentRegistCSS.studentRegistNameEn}
                  value={!modifyMode ? Student.stdNameEn : form.stdNameEn}
                  onChange={onChangeHandler}
                />
                연차
                <input
                  type="number"
                  name="stdLevel"
                  readOnly={!modifyMode}
                  className={StudentRegistCSS.studentRegistLevel}
                  value={!modifyMode ? Student.stdLevel : form.stdLevel}
                  onChange={onChangeHandler}
                />
                소속
                <input
                  className={StudentRegistCSS.studentRegistDeptCode}
                  name="deptCode"
                  readOnly={!modifyMode}
                  value={!modifyMode ? Student.department.deptName : form.deptName}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={StudentRegistCSS.studentRegistFormSecond}>
                이메일
                <input
                  type="text"
                  name="stdEmail"
                  readOnly={!modifyMode}
                  className={StudentRegistCSS.studentRegistEmail}
                  value={!modifyMode ? Student.stdEmail : form.stdEmail}
                  onChange={onChangeHandler}
                />
                비밀번호
                <input
                  type="text"
                  name="stdPwd"
                  readOnly
                  placeholder="마이페이지에서 확인해주세요"
                  className={StudentRegistCSS.studentRegistPwd}
                />
              </div>
              <div className={StudentRegistCSS.studentRegistFormThird}>
                휴대전화
                <input
                  type="text"
                  name="stdPhone"
                  readOnly={!modifyMode}
                  className={StudentRegistCSS.studentRegistPhone}
                  value={!modifyMode ? Student.stdPhone : form.stdPhone}
                  onChange={onChangeHandler}
                />
                상태
                <input
                  className={StudentRegistCSS.studentRegistStatus}
                  name="stdStatus"
                  readOnly={!modifyMode}
                  value={!modifyMode ? Student.stdStatus : form.stdStatus}
                  onChange={onChangeHandler}
                />
                주민등록번호
                <input
                  type="text"
                  name="stdSsn"
                  className={StudentRegistCSS.studentRegistSsn}
                  readOnly={!modifyMode}
                  value={!modifyMode ? Student.stdSsn : form.stdSsn}
                  onChange={onChangeHandler}
                />
              </div>

              <div className={StudentRegistCSS.studentRegistFormFourth}>
                주소
                <input
                  type="text"
                  name="stdAddress"
                  className={StudentRegistCSS.studentRegistAddress}
                  value={!modifyMode ? Student.stdAddress : form.stdAddress}
                  onClick={!modifyMode ? () => { } : onChangeOpenPost}
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                />
                {isOpenPost ? (
                  <div className={StudentRegistCSS.postCodeStyle}><DaumPostcode autoClose onComplete={onCompletePost} /></div>
                ) : null}
              </div>

              <div className={StudentRegistCSS.studentRegistFormFifth}>
                입사일
                <input
                  type={!modifyMode ? "text" : "date"}
                  name="stdEntDate"
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                  className={StudentRegistCSS.studentRegistEntDate}
                  value={!modifyMode ? Student.stdEntDate : form.stdEntDate}
                />
                휴직일
                <input
                  type={!modifyMode ? "text" : "date"}
                  name="stdAbDate"
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                  className={StudentRegistCSS.studentRegistAbDate}
                  value={!modifyMode ? Student.stdAbDate : form.stdAbDate}
                />
                퇴사일
                <input
                  type={!modifyMode ? "text" : "date"}
                  name="stdDropDate"
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                  className={StudentRegistCSS.studentRegistDropDate}
                  value={!modifyMode ? Student.stdDropDate : form.stdDropDate}
                />
              </div>
              <div className={StudentRegistCSS.buttonContainer}>
                {!modifyMode && <button onClick={onClickEditButtonHandler} className={StudentRegistCSS.studentRegistBtn}>수정</button>}
                {modifyMode && <button onClick={onClickStudentUpdateHandler} className={StudentRegistCSS.studentRegistBtn}>완료</button>}
                <button onClick={() => navigate(-1)} className={StudentRegistCSS.studentCancelBtn}>취소</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default StudentModify;