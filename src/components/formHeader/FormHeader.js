import React from 'react'
import { FolderOpen , ColorLens , MoreVert} from '@mui/icons-material'
import {FiStar ,FiSettings} from "react-icons/fi"
import { IconButton , Avatar} from '@mui/material'
import { BsEye } from 'react-icons/bs'
import { Button } from '@mui/material'
import { useStateValue } from '../../Store/Store';
import "./formheader.css"
import { useNavigate } from 'react-router-dom'


function FormHeader() {

    const [{doc_name} , dispatch] = useStateValue();
    const navigate = useNavigate();

  return (
    <div className='form_header'>
        <div className='form_header_left'>
            <img className='formImg' src="/images/form_image.png" alt="no image" />
            <input className='form_name' type="text" placeholder='Untitled Form' value={doc_name}/>
            <FolderOpen className='form_header_icon' style={{marginRight:"10px"}}></FolderOpen>
            <FiStar className='form_header_icon' style={{marginRight:"10px"}} />
            <span>All changes saved in Drive</span>
        </div>
        <div className='form_header_right'>

            <IconButton>
                <ColorLens size="small" className="form_header_icon"/>
            </IconButton>
            <IconButton onClick={() => navigate("/response")}>
                <BsEye className="form_header_icon" />
            </IconButton>
            <IconButton>
                <FiSettings className="form_header_icon" />                                      
            </IconButton>

            <Button variant="contained" color="primary" href="#contained-buttons">Send</Button>


            <IconButton>
                <MoreVert className="form_header_icon" />
            </IconButton>
            <IconButton>
                <Avatar style={{height: "30px" ,width: "30px"}} src="/images/kratik.jpg"/>
            </IconButton>

        </div>
    </div>
  )
}

export default FormHeader