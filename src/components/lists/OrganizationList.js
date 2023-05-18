import OrganizationItem from "../items/OrganizationItem";

function OrganizationList({employeeList}) {

  return (
    <div className="organizationListContainer">
      {
        Array.isArray(employeeList)
        && employeeList.map(employee => <OrganizationItem key={ employee.empCode } employee={ employee }/>)
      }
    </div>
  )
}

export default OrganizationList;