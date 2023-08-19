import React from 'react'
import { useStateValue } from '../../Store/Store'
import "./submitted.css"
import { Typography } from '@mui/material';

function Submitted() {

  const [{doc_name}] = useStateValue();

  return (
    <div className='submit'>
      <div className='user_from'>
        <div className='user_form_section'>
            <div className='user_title_section'>
                    <Typography style={{fontSize:"26px"}}>{doc_name? doc_name : "Untitled Form"}</Typography>

                    <p>Your response has been recorded.</p>
                    <a>Submit another response</a>
            </div>
          <div className='submission'>
            
          </div>

          <div className='user_footer'>
                    Google Form
          </div>

        </div>
      </div>  
    </div>
  )
}

export default Submitted