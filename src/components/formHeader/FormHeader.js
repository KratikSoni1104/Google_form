import React, { useContext, useState } from 'react'
import { FolderOpen , ColorLens , MoreVert} from '@mui/icons-material'
import {FiStar ,FiSettings} from "react-icons/fi"
import { IconButton , Avatar, DialogActions, DialogContent, DialogTitle, Dialog} from '@mui/material'
import { BsEye } from 'react-icons/bs'
import { Button } from '@mui/material'
import { useStateValue } from '../../Store/Store';
import "./formheader.css"
import { useNavigate } from 'react-router-dom'
import { BackEnd_Url } from '../../services/config'
import axios from 'axios'
import { HashContext } from '../../context/HashContext'


function FormHeader() {

    const [openDialog, setOpenDialog] =  useState(false);
    const [shareableLink , setShareableLink] = useState("")
    const {formId} = useContext(HashContext)
    const [{doc_name} , dispatch] = useStateValue();
    const navigate = useNavigate();

    const handleCopyLink = () => {

    }

    const handleOpenDialog = async () => {
        console.log(formId);
        const link = `https://google-form-tau.vercel.app/forms/form_link/${formId}`;
        setShareableLink(link)
        setOpenDialog(true);
    }



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

            <Button variant="contained" color="primary" href="#contained-buttons" onClick={() => {handleOpenDialog()}}>Send</Button>


            <IconButton>
                <MoreVert className="form_header_icon" />
            </IconButton>
            <IconButton>
                <Avatar style={{height: "30px" ,width: "30px"}} src="/images/kratik.jpg"/>
            </IconButton>
        </div>

{  openDialog &&  
        <div className='dialog-overlay'>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} className='dialog'>
                <DialogTitle>Share Form</DialogTitle>
                <DialogContent className="dialog-content">
                    <p>Copy the following link to share:</p>
                    <div className="shareable-link">{shareableLink}</div>
                </DialogContent>
                <DialogActions className="dialog-buttons">
                    <Button color='primary' variant='contained' onClick={handleCopyLink} className="copy-link-button">
                        Copy Link
                    </Button>
                    <Button variant='outlined' onClick={() => setOpenDialog(false)} className="close-button">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>}
    </div>
  )
}

export default FormHeader