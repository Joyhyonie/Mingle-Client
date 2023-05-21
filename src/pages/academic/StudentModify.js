import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentModifyCss from '../../css/StudentModify.module.css';
import StudentRegistCss from '../../css/StudentRegist.module.css';
import CommonCSS from '../../css/common/Common.module.css';
import { toast } from "react-hot-toast";
import { callStudentDetailAPI, callStudentUpdateAPI } from "../../apis/AcademicAPICalls";
import { useNavigate, useParams } from 'react-router-dom';
import DaumPostcode from "react-daum-postcode";

function StudentModify() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(state => state.StudentReducer);
  const { stdCode } = useParams();
  const { modify } = useSelector((state) => state.StudentReducer);
  const [form, setForm] = useState({});

  const imageInput = useRef(); // 이미지 삽입
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [deptCode, setDeptCode] = useState(); // 

  const [isOpenPost, setIsOpenPost] = useState(false); // 주소 업데이트
  const [stdAddressBase, setStdAddressBase] = useState('');
  const [stdAddressDetail, setStdAddressDetail] = useState('');

  /* 읽기 / 수정 구분 */
  const [modifyMode, setModifyMode] = useState(false);

  /* 수정모드 변경 이벤트 */
  const onClickModifyHandler = () => {
    setModifyMode(true);
    setForm({ ...data });
  }

  /* 최초 랜더링 시 학생 상세 정보 조회 */
  useEffect(() => {
    dispatch(callStudentDetailAPI({ stdCode }));
  }, []);

  useEffect(() => {
    if (modify?.status === 200) {
      toast.success("학생 정보가 성공적으로 수정 되었습니다.");
      navigate('/management-student');
    }
  }
    ,
    [modify]
  )

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
    if (e.target.name === 'stdAddressDetail') {
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

  /* formatDate => 데이트 형식 지정 */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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


  /* 학생 수정 버튼 클릭 이벤트 */
  const onClickStudentUpdateHandler = () => {

    const formData = new FormData();

    formData.append("stdCode", form.stdCode);
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
    console.log('modify form ', form)
    console.log('modify formdata ', formData)

    if (image) {
      formData.append("stdProfile", image);
    }

    dispatch(callStudentUpdateAPI(formData));
  }

  return (
    <div className={StudentRegistCss.studentContainer}>
      <div className={StudentRegistCss.studentClass}>
        <div className={StudentRegistCss.studentHeader}>
          {!modifyMode && <p className={CommonCSS.pageDirection}>학사관리 ▸ 학생 ▸ 조회</p>}
          {modifyMode &&
            <p className={CommonCSS.pageDirection}>학사관리 ▸ 학생 ▸ 수정</p>
          }
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
            {!modifyMode &&
              <button
                onClick={onClickModifyHandler}
                className={StudentModifyCss.studentModifyBtn}
              >
                수정
              </button>
            }
            {modifyMode &&
              <button
                onClick={onClickStudentUpdateHandler}>
                className={StudentModifyCss.studentRegistBtn}
                저장
              </button>}
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
              value={!modifyMode ? data.stdName : form.stdName}
              readOnly={!modifyMode}
              onChange={onChangeHandler}
            />
            영문명
            <input
              type="text"
              name="stdNameEn"
              className={StudentRegistCss.StudentRegistNameEn}
              onChange={onChangeHandler}
              value={!modifyMode ? data.stdNameEn : form.stdNameEn}
              readOnly={!modifyMode}
            />
            학년
            <input
              type="number"
              name="stdLevel"
              className={StudentRegistCss.StudentRegistLevel}
              onChange={onChangeHandler}
              value={!modifyMode ? data.stdLevel : form.stdLevel}
              readOnly={!modifyMode}
            />
            학과
            <input
              type="text"
              name="deptCode"
              className={StudentRegistCss.StudentRegistDeptCode}
              onChange={onChangeDeptCodeHandler}
              value={!modifyMode ? data.deptCode : form.deptCode}
              readOnly={!modifyMode}
            />
          </div>
          <div className={StudentRegistCss.StudentRegistFormSecond}>
            이메일
            <input
              type="text"
              name="stdEmail"
              className={StudentRegistCss.StudentRegistEmail}
              onChange={onChangeHandler}
              value={!modifyMode ? data.stdEmail : form.stdEmail}
              readOnly={!modifyMode}
            />
            비밀번호
            <input
              type="text"
              name="stdPwd"
              className={StudentRegistCss.StudentRegistPwd}
              onChange={onChangeHandler}
              value={!modifyMode ? data.stdPwd : form.stdPwd}
              readOnly={!modifyMode}
            />
          </div>
          <div className={StudentRegistCss.StudentRegistFormThird}>
            휴대전화
            <input
              type="tel"
              name="stdPhone"
              className={StudentRegistCss.StudentRegistPhone}
              onChange={onChangeHandler}
              value={!modifyMode ? data.stdPhone : form.stdPhone}
              readOnly={!modifyMode}
            />
            상태
            <select className={StudentRegistCss.StudentRegistStatus}
              name="stdStatus" onChange={onChangeHandler}
              value={!modifyMode ? data.stdStatus : form.stdStatus}
              readOnly={!modifyMode}>
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
              value={!modifyMode ? data.stdSsn : form.stdSsn}
              readOnly={!modifyMode}
            />
          </div>

          <div className={StudentRegistCss.StudentRegistFormFourth}>
            주소
            <input
              type="text"
              name="stdAddress"
              className={StudentRegistCss.StudentRegistAddress}
              onClick={onChangeOpenPost}
              value={!modifyMode ? data.stdAddress : form.stdAddress}
              readOnly={!modifyMode}
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
              readOnly={!modifyMode}
            />
          </div>
          <div className={StudentRegistCss.StudentRegistFormFifth}>
            입학일
            <input
              type="date"
              name="stdEntDate"
              className={StudentRegistCss.StudentRegistEntDate}
              onChange={onChangeHandler}
              value={!modifyMode ? data.stdEntDate : form.stdEntDate}
              readOnly={!modifyMode}
            />
            휴학일
            <input
              type="date"
              name="stdAbDate"
              className={StudentRegistCss.StudentRegistAbDate}
              onChange={onChangeHandler}
              value={!modifyMode ? data.stdAbDate : form.stdAbDate}
              readOnly={!modifyMode}
            />
            <div>
              자퇴일
              <input
                type="date"
                name="stdDropDate"
                className={StudentRegistCss.StudentRegistDropDate}
                onChange={onChangeHandler}
                value={!modifyMode ? data.stdDropDate : form.stdDropDate}
                readOnly={!modifyMode}
              />
              졸업일
              <input
                type="date"
                name="stdLeaveDate"
                className={StudentRegistCss.StudentRegistLeaveDate}
                onChange={onChangeHandler}
                value={!modifyMode ? data.stdLeaveDate : form.stdLeaveDate}
                readOnly={!modifyMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentModify;