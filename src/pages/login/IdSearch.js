
import { useEffect } from 'react';
import IdSearchForm from '../../components/form/IdSearchForm';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function IdSearch(){
    
    const {search} = useSelector(state => state.EmployeeReducer);

  
  

    return (
        
        <div>
                <IdSearchForm/>
                
        </div>

    )


}

export default IdSearch;