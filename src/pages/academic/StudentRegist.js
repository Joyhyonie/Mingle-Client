import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { callStudentInsertAPI } from "../../apis/AcademicAPICalls";
import StudentRegistCSS from '../../css/StudentRegist.module.css';
import CommonCSS from '../../css/common/Common.module.css';
import DaumPostcode from "react-daum-postcode";

function StudentRegist() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { regist } = useSelector((state) => state.StudentReducer);
  const [form, setForm] = useState({
    stdStatus: "선택",
    stdPwd: '$2a$10$COvazywgZPXseeKaYhruh.pAYYfcSeGO5aSrHOsLZN0X8joNwW2dW',
    stdLevel: '1',
  });
  const imageInput = useRef(); // 이미지 삽입
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [deptCode, setDeptCode] = useState(); // 
  const [isOpenPost, setIsOpenPost] = useState(false); // 주소 업데이트

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

  /* 학생 정보 등록 후 regist 값이 확인되면 학생 목록으로 이동 */
  useEffect(() => {
    if (regist?.status === 200) {
      toast.success("신규 학생 등록이 완료 되었습니다.");
      navigate('/management-student', { replace: true });
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
  const onClickStudentRegistHandler = () => {

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
    // formData.append("stdCode", form.stdCode);
    formData.append("stdName", form.stdName);
    formData.append("stdNameEn", form.stdNameEn);
    formData.append("stdLevel", form.stdLevel);
    formData.append("department.deptCode", deptCode);
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
    console.log('regist form ', form)
    console.log('regist formdata ', formData)

    if (image) {
      formData.append("stdProfile", image);
    }

    dispatch(callStudentInsertAPI(formData));
  }

  return (
    <div className={StudentRegistCSS.studentContainer}>
      <div className={StudentRegistCSS.studentClass}>
        <div className={StudentRegistCSS.studentHeader}>
          <p className={CommonCSS.pageDirection}>학사관리 ▸ 학생 ▸ 등록</p>
          {imageUrl && (
            <img
              className={StudentRegistCSS.studentImageAfter}
              alt="preview"
              src={imageUrl}
            />
          )}
          {!imageUrl && (
            <button className={StudentRegistCSS.ImageUploadBtn}
              onClick={onClickImageUpload}><img
                className={StudentRegistCSS.studentImageBefore}
                alt="preview"
                src="/images/person.png"
              /></button>
          )}
          <input
            style={{ display: 'none' }}
            type="file"
            name='stdProfile'
            accept='image/jpg, img/png, image/jpeg, image/gif'
            ref={imageInput}
            onChange={onChangeImageUpload}
          />

        </div>
        <div className={StudentRegistCSS.studentRegistInformation}>
          <div className={StudentRegistCSS.studentRegistFormFirst}>
            이름
            <input
              type="text"
              name="stdName"
              className={StudentRegistCSS.studentRegistName}
              onChange={onChangeHandler}
            />
            영문명
            <input
              type="text"
              name="stdNameEn"
              className={StudentRegistCSS.studentRegistNameEn}
              onChange={onChangeHandler}
            />
            학년
            <input
              type="number"
              name="stdLevel"
              readOnly
              className={StudentRegistCSS.studentRegistLevel}
              value={form.stdLevel}
            />
            학과
            <select className={StudentRegistCSS.studentRegistDeptCode} name="deptCode" onChange={onChangeDeptCodeHandler} value={deptCode}>
              <option value="선택">선택</option>
              <option value="13" onChange={onChangeDeptCodeHandler}>IT공학과</option>
              <option value="14" onChange={onChangeDeptCodeHandler}>간호학과</option>
              <option value="15" onChange={onChangeDeptCodeHandler}>경제학과</option>
              <option value="16" onChange={onChangeDeptCodeHandler}>경영학과</option>
              <option value="17" onChange={onChangeDeptCodeHandler}>환경공학과</option>
              <option value="18" onChange={onChangeDeptCodeHandler}>외식조리학과</option>
              <option value="19" onChange={onChangeDeptCodeHandler}>아동교육학과</option>
              <option value="20" onChange={onChangeDeptCodeHandler}>시각디자인학과</option>
            </select>
          </div>
          <div className={StudentRegistCSS.studentRegistFormSecond}>
            이메일
            <input
              type="text"
              name="stdEmail"
              className={StudentRegistCSS.studentRegistEmail}
              onChange={onChangeHandler}
            />
            비밀번호
            <input
              type="text"
              name="stdPwd"
              readOnly
              className={StudentRegistCSS.studentRegistPwd}
              placeholder='자동기입! 추후 수정 가능'>
            </input>
          </div>
          <div className={StudentRegistCSS.studentRegistFormThird}>
            휴대전화
            <input
              type="text"
              name="stdPhone"
              placeholder='숫자만 입력하세요.'
              className={StudentRegistCSS.studentRegistPhone}
              onChange={onChangeHandler}
            />
            상태
            <select className={StudentRegistCSS.studentRegistStatus} name="stdStatus" onChange={onChangeHandler} value={form.stdStatus}>
              <option value="선택">선택</option>
              <option value="재학" onChange={onChangeHandler}>재학</option>
              <option value="휴학" onChange={onChangeHandler}>휴학</option>
              <option value="졸업" onChange={onChangeHandler}>졸업</option>
              <option value="자퇴" onChange={onChangeHandler}>자퇴</option>
            </select>
            주민등록번호
            <input
              type="text"
              name="stdSsn"
              className={StudentRegistCSS.studentRegistSsn}
              onChange={onChangeHandler}
            />
          </div>

          <div className={StudentRegistCSS.studentRegistFormFourth}>
            주소
            <input
              type="text"
              name="stdAddress"
              className={StudentRegistCSS.studentRegistAddress}
              value={form.stdAddress}
              onClick={onChangeOpenPost}
              readOnly
            />
            {isOpenPost ? (
              <div className={StudentRegistCSS.postCodeStyle}><DaumPostcode autoClose onComplete={onCompletePost} /></div>
            ) : null}
          </div>

          <div className={StudentRegistCSS.studentRegistFormFifth}>
            입학일
            <input
              type="date"
              name="stdEntDate"
              className={StudentRegistCSS.studentRegistEntDate}
              onChange={onChangeHandler}
            />
            휴학일
            <input
              type="date"
              name="stdAbDate"
              className={StudentRegistCSS.studentRegistAbDate}
              onChange={onChangeHandler}
            />
            </div>
            <div className={StudentRegistCSS.studentRegistFormSixth}>
            자퇴일
            <input
              type="date"
              name="stdDropDate"
              className={StudentRegistCSS.studentRegistDropDate}
              onChange={onChangeHandler}
            />
            졸업일
            <input
              type="date"
              name="stdLeaveDate"
              className={StudentRegistCSS.studentRegistLeaveDate}
              onChange={onChangeHandler}
            />
          </div>
          <div className={StudentRegistCSS.buttonContainer}>
            <button onClick={onClickStudentRegistHandler} className={StudentRegistCSS.studentRegistBtn}>등록</button>
            <button onClick={() => navigate(-1)} className={StudentRegistCSS.studentCancelBtn}>취소</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentRegist;