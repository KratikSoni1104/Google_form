import React, { useContext, useEffect, useRef, useState } from 'react'
import { FolderOpen , ColorLens , MoreVert, AirplaySharp} from '@mui/icons-material'
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
import { useFormId } from '../../context/FormContext'


function FormHeader() {

    const [openDialog, setOpenDialog] =  useState(false);
    const [copied, setCopied] = useState(false);
    const [shareableLink , setShareableLink] = useState("")
    //const {formId} = useContext(HashContext)
    var [{doc_name} , dispatch] = useStateValue();
    const navigate = useNavigate();
    const [docName , setDocName] = useState("Untitled Form")
    var docRef = useRef(null)
    const {formId} = useFormId();

    const handleCopyLink = async () => {
        try{
            await navigator.clipboard.writeText(shareableLink)
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (formId) {
          const link = `https://google-form-tau.vercel.app/userforms/form_link/${formId}`;
          setShareableLink(link);
        }
      }, [formId]);

    const handleOpenDialog = async () => {
        console.log(formId);
        setOpenDialog(true);
    }

    const handleFormName = async (e) => {
        setDocName(e.target.value);
        docRef.current = e.target.value;
        try {
            await axios.put(`${BackEnd_Url}/api/form/updateData/${formId}`, {
                doc_name : docRef.current,
            });
        } catch (err) {
            console.error('Error updating document name:', err);
        }
    }



  return (
    <div className='form_header'>
        <div className='form_header_left'>
            <img className='formImg' src="/images/form_image.png" alt="no image" />
            <input className='form_name' type="text" placeholder='Untitled Form' onChange={e => handleFormName(e)}/>
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
                        {copied ? 'Copied' : 'Copy Link' }
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