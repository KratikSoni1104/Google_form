import React, { useContext } from 'react'
import "./header.css";
import { Avatar,  Drawer,  IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Apps } from '@mui/icons-material';
import TempDrawer from '../drawer/TempDrawer';
import { AuthContext } from '../../context/AuthContext';


function Header() {

    const {photoUrl} = useContext(AuthContext)

  return (
    <div className='header'>
        <div className='headerInfo'>
            <TempDrawer />
            <img className='formImg' src="/images/form_image.png" alt="" />
            <div className='info'>
                Forms
            </div>
        </div>

        <div className='headerSearch'>
            <IconButton>
                <Search />
            </IconButton>
            <input type="text" placeholder='Search'/>
        </div>

        <div className='headerRight'>
            <IconButton>
                <Apps />
            </IconButton>
            <IconButton>
                <Avatar src={photoUrl}/>
            </IconButton>
        </div>
    </div>
  )
}

export default Header