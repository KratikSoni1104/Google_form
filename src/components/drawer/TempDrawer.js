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
              <span style={{color: "#5f6368" ,fontweight: "500" ,fontSize: "22px" ,fontFamily: "'Product Sans' ,Arial, sans-serif"}}> Docs</span>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />

        <List className='listStyle'>
          <ListItem className='list_Item'>
            <img className="slidesImage" src="/images/2993697_brand_brands_docs_google_logo_icon.png" alt=""/>
            <div className="listItems">Docs</div>
          </ListItem>
          <ListItem className='list_Item'>
            <img className="slidesImage" src="/images/569111_docs_excel_google_document_file_icon.png" alt=""/>
            <div className="listItems">Sheets</div>
          </ListItem>
          <ListItem className='list_Item'>
            <img className="slidesImage" src="/images/2993687_brand_brands_google_logo_logos_icon.png" alt=""/>
            <div className="listItems">Slides</div>
          </ListItem>
          <ListItem className='list_Item'>
            <img className="slidesImage" src="/images/form_image.png" alt=""/>
            <div className="listItems">Forms</div>
          </ListItem>
        </List>
        <Divider />

        <List className='listStyle'>
          <ListItem className='list_Item'>
            <FiSettings />
            <div className='listItems'>Settings</div>
          </ListItem>
          <ListItem className='list_Item'>
            <BsQuestionCircle />
            <div className='listItems'>Help & Feedback</div>
          </ListItem>
        </List>

        <Divider />

        <List className='listStyles'>
          <ListItem className='list_Item'>
            <img className='slidesImage' src="/images/317713_drive_google_google drive_icon.png" alt="" />
            <div className='listItems'>Drive</div>
          </ListItem>
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