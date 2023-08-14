import React, { useState } from 'react'
import { IconButton, MenuItem, Select, useScrollTrigger } from '@mui/material'
import { FolderOpen ,Storage , ArrowDropDown, MoreVert, LineAxisOutlined } from '@mui/icons-material'
import {Menu} from '@mui/material'
import "./home.css"
import axios from  "axios"
import { useNavigate } from 'react-router-dom'
import {useStateValue} from "../../Store/Store"
import { BackEnd_Url } from '../../services/config'

function Home() {

    const [openMenu , setOpenMenu] = useState(false)
    const [files , setFiles] = useState([]);
    const navigate = useNavigate();
    const [{doc_name , doc_desc } , dispatch] = useStateValue();

    const openDoc = (file) => {
        const id = file._id
        navigate(`/form/${id}` , {state:{id:id}})
    }

    const filename = async () => {
        try{
            const res = await axios.get(`${BackEnd_Url}/api/form/get_all_filenames`)
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
        <div className='main_docs'>

            {files?.map(item => (
                <div className='doc_card' >
                <img className='doc_image' src="images/doc_image.png" alt="" onClick={() => openDoc(item)} />
                <div className='doc_card_content'>
                    <h5 className='heading'>{doc_name}</h5>
                    <div className='doc_content'>
                        <div className='doc_content_left'>
                            <img style={{width:"25px"}} src="/images/form_icon.png"/>
                            {/* <div className='content_left'>
                                <Storage style={{color: "white", fontSize: "12px",backgroundcolor: "#6E2594" ,padding:"3px" ,marginRight: "3px" , borderRadius:"2px"}} />
                            </div> */}
                            <span>opened </span>
                        </div>
                        <div className='doc_content_right'>
                            <IconButton onClick={() => setOpenMenu(!openMenu)}>
                                <MoreVert style={{color:"gray" , fontSize:"20px"}} />
                            </IconButton>
                            <Menu>
                                <MenuItem>Rename</MenuItem>
                                <MenuItem>Remove</MenuItem>
                            </Menu>
                        </div>    
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Home