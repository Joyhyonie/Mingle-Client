import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentRegistCss from '../../css/StudentRegist.module.css';
import CommonCSS from '../../css/common/Common.module.css';
import { toast } from "react-hot-toast";
import { callStudentInsertAPI } from "../../apis/AcademicAPICalls";
import { useNavigate } from 'react-router-dom';
import DaumPostcode from "react-daum-postcode";

function StudentRegist() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { regist } = useSelector((state) => state.StudentReducer);
  const [form, setForm] = useState({});
  const imageInput = useRef(); // 이미지 삽입
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [deptCode, setDeptCode] = useState(); // 
  const [isOpenPost, setIsOpenPost] = useState(false); // 주소 업데이트
  const [stdAddressBase, setStdAddressBase] = useState('');
  const [stdAddressDetail, setStdAddressDetail] = useState('');

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
    if(e.target.name === 'stdAddressDetail') {
      setStdAddressDetail(e.target.value);
    }
  }

  /* 칸을 눌렀을 때 팝업이 열리도록 */
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  /* 주소를 서치한 후 성공적으로 주소가 입력 되도록 */
  const onCompletePost = (data) => {
    let fullAddress = data.address;
    setStdAddressBase(fullAddress);
    setForm({
      ...form,
      stdAddress: fullAddress 
    });
    setIsOpenPost(false);
  };

  /* select박스로 상태를 변경할 때 */
  // const onChangeStatusHandler = (e) => {
  //   setStdStatus(e.target.value)
  // }

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
      toast.success("학생 등록이 완료 되었습니다. 학번은 " + regist?.data?.stdCode + " 입니다.");
      navigate('/management-student', { replace: true });
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

    const formData = new FormData();
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
    const detailAddress = stdAddressDetail ? stdAddressDetail : '';
    formData.append("stdAddress", form.stdAddressBase + ' ' + detailAddress); // 기본 주소와 상세 주소 합치기
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
    <div className={StudentRegistCss.studentContainer}>
      <div className={StudentRegistCss.studentClass}>
        <div className={StudentRegistCss.studentHeader}>
          <p className={CommonCSS.pageDirection}>학사관리 ▸ 학생 ▸ 등록</p>
          {imageUrl && (
            <img
              className={StudentRegistCss.studentImageAfter}
              alt="preview"
              src={imageUrl}
            />
          )}
          {!imageUrl && (
            <button className={StudentRegistCss.ImageUploadBtn}
              onClick={onClickImageUpload}><img
                className={StudentRegistCss.studentImageBefore}
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
          <div className={StudentRegistCss.buttonContainer}>
            <button onClick={onClickStudentRegistHandler} className={StudentRegistCss.StudentRegistBtn}>등록</button>
            <button onClick={() => navigate(-1)} className={StudentRegistCss.StudentCancelBtn}>취소</button>
          </div>

        </div>
        <div className={StudentRegistCss.StudentRegistInformation}>
          <div className={StudentRegistCss.StudentRegistFormFirst}>
            이름
            <input
              type="text"
              name="stdName"
              className={StudentRegistCss.StudentRegistName}
              onChange={onChangeHandler}
            />
            영문명
            <input
              type="text"
              name="stdNameEn"
              className={StudentRegistCss.StudentRegistNameEn}
              onChange={onChangeHandler}
            />
            학년
            <input
              type="number"
              name="stdLevel"
              className={StudentRegistCss.StudentRegistLevel}
              onChange={onChangeHandler}
            />
            학과
            <input
              type="text"
              name="deptCode"
              className={StudentRegistCss.StudentRegistDeptCode}
              onChange={onChangeDeptCodeHandler}
            />
          </div>
          <div className={StudentRegistCss.StudentRegistFormSecond}>
            이메일
            <input
              type="text"
              name="stdEmail"
              className={StudentRegistCss.StudentRegistEmail}
              onChange={onChangeHandler}
            />
            비밀번호
            <input
              type="text"
              name="stdPwd"
              className={StudentRegistCss.StudentRegistPwd}
              onChange={onChangeHandler}
            />
          </div>
          <div className={StudentRegistCss.StudentRegistFormThird}>
            휴대전화
            <input
              type="tel"
              name="stdPhone"
              className={StudentRegistCss.StudentRegistPhone}
              onChange={onChangeHandler}
            />
            상태
            <select className={StudentRegistCss.StudentRegistStatus} name="stdStatus" onChange={onChangeHandler} value={form.stdStatus}>
              <option value="1" onChange={onChangeHandler}>재학</option>
              <option value="2" onChange={onChangeHandler}>휴학</option>
              <option value="3" onChange={onChangeHandler}>자퇴/중퇴</option>
              <option value="4" onChange={onChangeHandler}>졸업</option>
            </select>
            주민등록번호
            <input
              type="text"
              name="stdSsn"
              className={StudentRegistCss.StudentRegistSsd}
              onChange={onChangeHandler}
            />
          </div>

          <div className={StudentRegistCss.StudentRegistFormFourth}>
            주소
            <input
              type="text"
              name="stdAddress"
              className={StudentRegistCss.StudentRegistAddress}
              value={form.stdAddress} // value
              onClick={onChangeOpenPost}
              readOnly
            />
            {isOpenPost ? (
              <div className={StudentRegistCss.postCodeStyle}><DaumPostcode autoClose onComplete={onCompletePost} /></div>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              name="stdAddressDetail"
              className={StudentRegistCss.StudentRegistAddressDetail}
              onChange={onChangeHandler}
            />
          </div>
          <div className={StudentRegistCss.StudentRegistFormFifth}>
            입학일
            <input
              type="date"
              name="stdEntDate"
              className={StudentRegistCss.StudentRegistEntDate}
              onChange={onChangeHandler}
            />
            휴학일
            <input
              type="date"
              name="stdAbDate"
              className={StudentRegistCss.StudentRegistAbDate}
              onChange={onChangeHandler}
            />
            <div>
              자퇴일
              <input
                type="date"
                name="stdDropDate"
                className={StudentRegistCss.StudentRegistDropDate}
                onChange={onChangeHandler}
              />
              졸업일
              <input
                type="date"
                name="stdLeaveDate"
                className={StudentRegistCss.StudentRegistLeaveDate}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentRegist;