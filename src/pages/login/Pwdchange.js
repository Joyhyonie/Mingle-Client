import { useNavigate } from 'react-router';
import PwdChangeForm from '../../components/form/PwdchangeForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetEmployee } from '../../modules/EmployeeModule';

function PwdChange() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { change } = useSelector(state => state.EmployeeReducer);

    
    return (
        
        <div>
            <PwdChangeForm/>
        </div>
        
    
        );
    
}
export default PwdChange;