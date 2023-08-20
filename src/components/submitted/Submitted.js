import React from 'react'
import { useStateValue } from '../../Store/Store'
import "./submitted.css"
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {useFormId} from "../../context/FormContext"

function Submitted() {

  const [{doc_name}] = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();
  const formId = location.state || {};
  const {accept} = useFormId();

  const handleSubmit = () => {
    navigate(-1);
  }

  return (
    <div className='submit'>
      <div className='user_from'>
        <div className='user_form_section'>
            <div className='user_title_section'>
                    <Typography style={{fontSize:"26px"}}>{doc_name? doc_name : "Untitled Form"}</Typography>

                    <p>{accept ? 'Your response has been recorded.' : 'This form is no longer accepting responses.'}</p>
                    <a onClick={() => {handleSubmit()}}>Submit another response</a>
            </div>

          <div className='user_footer'>
            Google<span>Form</span> 
          </div>

        </div>
      </div>  
    </div>
  )
}

export default Submitted