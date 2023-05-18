import OrganizationItemCss from "../../css/OrganizationItemCss.module.css";

function OrganizationItem({ employee }) {
  const { empName, empNameEn, empEmail, empProfile, department, empPhone } = employee;
  const { deptName } = department;

  return (
    <div className={OrganizationItemCss.organizationBox}>
      <div className={OrganizationItemCss.organizationItems}>
        <div className={OrganizationItemCss.orgNameBox}>
          <p className={OrganizationItemCss.orgEmpName}>{empName}</p>
          <p className={OrganizationItemCss.orgEmpNameEn}>{empNameEn}</p>
        </div>
        <div className={OrganizationItemCss.orgContentBox}>
          <br />
          <p className={OrganizationItemCss.orgDeptName}>소속 : {deptName}</p>
          <p className={OrganizationItemCss.orgEmpEmail}>이메일 : {empEmail}</p>
          <p className={OrganizationItemCss.orgEmpEmail}>대표전화 : {empPhone}</p>
          <br />
        </div>
      </div>
      <img src={empProfile} alt={empName} />
    </div>
  )
}

export default OrganizationItem;
