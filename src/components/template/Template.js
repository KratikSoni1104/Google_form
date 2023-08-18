import React, { useContext } from 'react'
import { MoreVert, UnfoldMore} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import "./template.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { BackEnd_Url } from '../../services/config'
import {HashContext} from "../../context/HashContext"

function Template() {
    const navigate = useNavigate();
    const {userId , dispatch} = useContext(HashContext)
    console.log("user id" , userId);

    const createForm = async () => {       
        var questions_list=[{question:"Question", questionType: "radio", options:[{optionText:"option 1"}], open: true, required:false}]

        try {
            const res = await axios.post(`${BackEnd_Url}/api/form/add_questions/${userId}` , {
                doc_name:"Untitled Form",
                doc_desc:"Add Description",
                questions: questions_list,
                createdBy: userId
            })
            console.log(res.data);
            navigate(`/form/${res.data._id}` , {state:{id:res.data._id}})
            dispatch({type:"SET_FORM_ID" , payload: res.data._id})
        } catch(err) {
            console.log(err);
        }

        
    }

  return (
    <div className='templateSection'>
        <div className='temp_top'>
            <div className='temp_left'>
                <span>Start a New Form</span>
            </div>
            <div className='temp_right'>
                <div className='temp_gallery'>
                    Template Gallery
                    <UnfoldMore style={{fontSize:"small"}} />
                </div>
                <IconButton>
                    <MoreVert style={{fontSize:"small"}}/>
                </IconButton>
            </div>
        </div>
        <div className='temp_body'>
            <div className='card'>
                <img onClick={createForm} src="images/google_blank.png" alt="" className='card_image blank'/>
                <p className='card_title'>Blank</p>
            </div>
            <div className='card'>
                <img src="images/party.png" alt="" className='card_image'/>
                <p className='card_title'>Party Invite</p>
            </div>
            <div className='card'>
                <img src="images/contact.png" alt="" className='card_image'/>
                <p className='card_title'>Contact Information</p>
            </div>
        </div>
    </div>
  )
}

export default Template