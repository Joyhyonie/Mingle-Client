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
  const { regist } = useSelector((state) => state.EmployeeReducer);
  const [form, setForm] = useState({});
  const imageInput = useRef(); // 이미지 삽입
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [deptCode, setDeptCode] = useState(); // 
  const [isOpenPost, setIsOpenPost] = useState(false); // 주소 업데이트
  const [empAddressBase, setEmpAddressBase] = useState('');
  const [empAddressDetail, setEmpAddressDetail] = useState('');

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
    if (e.target.name === 'empAddressDetail') {
      setEmpAddressDetail(e.target.value);
    }
  }

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

  /* 학생 정보 등록 후 regist 값이 확인되면 학생 목록으로 이동 */
  useEffect(() => {
    if (regist?.status === 200) {
      toast.success("신규 교직원 등록이 완료 되었습니다. 교번은 " + regist?.data?.empCode + " 입니다.");
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
    const detailAddress = empAddressDetail ? empAddressDetail : '';
    formData.append("empAddress", form.empAddressBase + ' ' + detailAddress); // 기본 주소와 상세 주소 합치기
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
          <div className={EmployeeRegistCss.buttonContainer}>
            <button onClick={onClickEmployeeRegistHandler} className={EmployeeRegistCss.employeeRegistBtn}>등록</button>
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
              className={EmployeeRegistCss.employeeRegistLevel}
              onChange={onChangeHandler}
            />
            소속
            <input
              type="text"
              name="deptCode"
              className={EmployeeRegistCss.employeeRegistDeptCode}
              onChange={onChangeDeptCodeHandler}
            />
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
              className={EmployeeRegistCss.employeeRegistPwd}
              onChange={onChangeHandler}
            />
          </div>
          <div className={EmployeeRegistCss.employeeRegistFormThird}>
            휴대전화
            <input
              type="tel"
              name="empPhone"
              className={EmployeeRegistCss.employeeRegistPhone}
              onChange={onChangeHandler}
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
          <div>
            <input
              type="text"
              name="empAddressDetail"
              className={EmployeeRegistCss.employeeRegistAddressDetail}
              onChange={onChangeHandler}
            />
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
        </div>
      </div>
    </div>
  )
}

export default EmployeeRegist;