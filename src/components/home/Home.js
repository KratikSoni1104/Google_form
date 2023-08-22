import React, { useContext, useRef, useState } from 'react'
import { Button, IconButton, MenuItem } from '@mui/material'
import { FolderOpen ,Storage , ArrowDropDown, MoreVert, Edit, Delete } from '@mui/icons-material'
import {Menu} from '@mui/material'
import "./home.css"
import axios from  "axios"
import { useNavigate } from 'react-router-dom'
import {useStateValue} from "../../Store/Store"
import { BackEnd_Url } from '../../services/config'
import { HashContext } from '../../context/HashContext'
import {useFormId} from "../../context/FormContext"

function Home() {

    const [anchorEl, setAnchorEl] = useState(null);  // for opening a new anchor of menu options
    const [openRename , setOpenRename] = useState(false) // for opening a new rename dialog
    // const [formIdRef , setformIdRef] = useState("");  // to identify the form opened
    const [closeRename , setCloseRename] = useState("") // to identify the input by user for form rename
    const [files , setFiles] = useState([]); // to store the forms of user
    const navigate = useNavigate();
    const [{doc_name , doc_desc } , dispatch] = useStateValue();
    const {user} = useContext(HashContext);
    const userId = user._id;
    const {formId , setFormId} = useFormId()

    // Use useRef to store the formId
    var formIdRef = useRef(null);
    var formName = useRef(null);

    const handleMenuOpen = (e , item) => {
        formIdRef.current = item._id;
        formName.current = item.doc_name;
        console.log(userId)
        console.log(formIdRef.current);
        setAnchorEl(e.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const openDoc = (file) => {
        setFormId(file._id)
        navigate(`/form/${file._id}`, {state:{id:file._id}})
    }

    const handleRename = async () => {
        console.log("enter");
        try{
            const res = await axios.put(`${BackEnd_Url}/api/form/renameData/${formIdRef.current}` , {doc_name:closeRename})
        } catch(err) {
            console.log(err);
        }
        setOpenRename(false)
        handleMenuClose();
    }

    const handleDelete = async (item) => {
        try{
            await axios.delete(`${BackEnd_Url}/api/form/removeData/${userId}/${formIdRef.current}`);
        } catch(err) {
            console.log(err);
        }
        handleMenuClose();
    }

    const renameClick = (item) => {
        //formIdRef = item._id
        setOpenRename(true)
        handleMenuClose();
    }

    const handleNameChange = (name) => {
        setCloseRename(name)
        console.log(closeRename);
    }

    const filename = async () => {
        try{
            const res = await axios.get(`${BackEnd_Url}/api/form/get_all_filenames/${userId}`)
            setFiles(res.data);
        } catch(err) {
            console.log(err);
        }
    }
    filename();

  return (
    <div className='main'>
        <div className='main_top'>
            <div className='main_top_left'>
                Recent Forms
            </div>
            <div className='main_top_right'>
                <div className='main_top_right_center'>Owned by anyone <ArrowDropDown /></div>
                <IconButton>
                    <Storage style={{fontSize:"16px" , color:"black"}} />
                </IconButton>
                <IconButton>
                    <FolderOpen style={{fontSize:"16px" , color:"black"}} />
                </IconButton>
            </div>
        </div>
        <div className={`main_docs ${openRename ? 'disabled' : ''}`} >

            {files?.map(item => (
                <div className='doc_card' key={item._id}>
                <img className='doc_image' src="images/doc_image.png" alt="" onClick={() => openDoc(item)} />
                <div className='doc_card_content'>
                    <h5 className='heading'>{item.doc_name}</h5>
                    <div className='doc_content'>
                        <div className='doc_content_left'>
                            <img style={{width:"25px"}} src="/images/form_icon.png"/>
                            {/* <div className='content_left'>
                                <Storage style={{color: "white", fontSize: "12px",backgroundcolor: "#6E2594" ,padding:"3px" ,marginRight: "3px" , borderRadius:"2px"}} />
                            </div> */}
                            <span>opened </span>
                        </div>
                        <div className='doc_content_right'>
                            <IconButton onClick={(e) => {handleMenuOpen(e , item)}}>
                                <MoreVert style={{color:"gray" , fontSize:"20px"}} />
                            </IconButton>
                            <Menu
                                onClose={handleMenuClose}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                keepMounted
                                style={{padding:"15px"}}
                            >
                                <MenuItem style={{fontSize:"12px"}} onClick={() => {renameClick(item)}}><Edit style={{marginRight:"15px",fontSize:"15px"}}/> Rename</MenuItem>
                                <MenuItem style={{fontSize:"12px"}} onClick={() => {handleDelete(item)}}><Delete style={{marginRight:"15px", fontSize:"15px"}}/> Remove</MenuItem>
                            </Menu>
                        </div>    
                    </div>
                </div>
            </div>
            ))}
            
        </div>
        {openRename && 
            <div className='main_rename'>
                <div className='rename-container'>
                    <p className='rename-head'>Rename</p>
                    <p className='rename-text'>Please enter the new name for the item:</p>
                    <input className='rename-input' type="text" placeholder={formName.current} onChange={e => handleNameChange(e.target.value)}/>
                    <div className='rename_button'>
                        <Button variant='outlined' style={{padding:"2px 5px" , fontSize:"10px" , color:"#6E2594"}} onClick={() => {setOpenRename(false)}}>Cancel</Button>
                        <Button color='primary' variant='contained' style={{padding:"2px" ,fontSize:"12px" , marginLeft:"15px"}} onClick={() => {handleRename()}}>OK</Button>
                    </div>
                </div>
        </div>}
    </div>
  )
}

export default Home