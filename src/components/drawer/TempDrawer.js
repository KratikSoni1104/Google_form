import React, { useState } from 'react'
import { Menu } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {Drawer} from '@mui/material'
import {List} from '@mui/material'
import {ListItem , ListItemText, Divider} from '@mui/material'
import "./tempDrawer.css"
import {FiSettings} from "react-icons/fi"
import {BsQuestionCircle} from "react-icons/bs"


function TempDrawer() {

  const [state , setState] = useState({
    left:false
  })

  const toggleDrawer = (anchor ,open) => event => {
    return setState({...state , [anchor]:open});
  }

  const list = anchor => {
    return (
      <div style={{width:"250px" , role:"prsentation"}}>
        <Divider />
        <List>
          <ListItem>
            <ListItemText style={{fontSize: "48px" ,marginLeft: "5px"}}>
              <span style={{color: "#68bffe" , fontWeight: "700" ,fontSize: "22px", fontFamily: "'Product Sans' ,Arial, sans-serif"}}>G</span>
              <span style={{color: "red", fontWeight: "500" ,fontSize: "22px", fontFamily: "'Product Sans' ,Arial, sans-serif"}}>o</span>
              <span style={{color: "yellow" ,fontweight: "500", fontSize: "22px",  fontFamily: "'Product Sans' ,Arial, sans- serif"}}>o</span>
              <span style={{color: "blue" ,fontWeight: "500", fontSize: "22px" ,fontFamily: "'Product Sans' Arial, sans-serif"}}>g</span>
              <span style={{color: "green" ,fontWeight: "500", fontSize: "22px", fontFamily: "'Product Sans' Arial,sans-serif"}}>l</span>
              <span style={{color:"red" ,fontweight: "500" ,fontSize: "22px" ,marginRight: "10px" ,fontFamily:"'Product Sans''Arial,sans-serif"}}>e</span>
              <span style={{color: "#5f6368" ,fontweight: "500" ,fontSize: "22px" ,fontFamily: "'Product Sans' ,Arial, sans-serif"}}> Forms</span>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />

        <List className='listStyle'>
          <a href='https://docs.google.com/document/u/0/' target='blank' className='list_links'>
            <ListItem className='list_Item'>
              <img className="slidesImage" src="/images/2993697_brand_brands_docs_google_logo_icon.png" alt=""/>
              <div className="listItems">Docs</div>
            </ListItem>
          </a>
          <a href='https://docs.google.com/spreadsheets/u/0/' target='blank' className='list_links'>
            <ListItem className='list_Item'>
              <img className="slidesImage" src="/images/569111_docs_excel_google_document_file_icon.png" alt=""/>
              <div className="listItems">Sheets</div>
            </ListItem>
          </a>
          <a href='https://docs.google.com/presentation/u/0/' target='blank' className='list_links'>
            <ListItem className='list_Item'>
              <img className="slidesImage" src="/images/2993687_brand_brands_google_logo_logos_icon.png" alt=""/>
              <div className="listItems">Slides</div>
            </ListItem>
          </a>
          <a href='https://docs.google.com/forms/u/0/' target='blank'  className='list_links'>
            <ListItem className='list_Item'>
              <img className="slidesImage" src="/images/form_image.png" alt=""/>
              <div className="listItems">Forms</div>
            </ListItem>
          </a>
        </List>
        <Divider />

        <List className='listStyle'>
          <a href='https://support.google.com/accounts/answer/3118621?hl=en' target='blank' className='list_links'>
            <ListItem className='list_Item'>
              <FiSettings style={{color:"#000"}}/>
              <div className='listItems'>Settings</div>
            </ListItem>
          </a>
          <a href='https://support.google.com/voice/answer/9271827?hl=en&co=GENIE.Platform%3DAndroid' target='blank' className='list_links'>
            <ListItem className='list_Item'>
              <BsQuestionCircle style={{color:"#000"}} />
              <div className='listItems'>Help & Feedback</div>
            </ListItem>
          </a>
        </List>

        <Divider />

        <List className='listStyles'>
        <a href='https://drive.google.com/drive/my-drive' target='blank' className='list_links'>
          <ListItem className='list_Item'>
            <img className='slidesImage' src="/images/drive.png" alt="" />
            <div className='listItems'>Drive</div>
          </ListItem>
        </a>
        </List>
      </div>
      
    )
  }

  return (
    <div>
        <IconButton onClick={toggleDrawer("left",true)}>
            <Menu />
        </IconButton>
        <Drawer onClose={toggleDrawer("left",false)} anchor={"left"} open={state["left"]}>
          {list("left")}
        </Drawer>
    </div>
  )
}

export default TempDrawer