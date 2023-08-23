import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Paper, Switch, Tabs, Typography } from '@mui/material';
import { Tab } from '@mui/material';
import PropTypes from 'prop-types';
import Question_form from "../questionForm/QuestionForm";
import { MoreVert } from '@mui/icons-material';
import "./tabs.css"
import { BackEnd_Url } from '../../services/config';
import axios from 'axios';
import {useFormId} from "../../context/FormContext"


export const revalidate = 0


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CenteredTabs() {
  const [value, setValue] = useState(0);
  const [responseCount , setResponseCount] = useState(0);
  const [accepting , setAccepting] = useState(null)
  const {setAccept , accept} = useFormId();
  var currentCheck = useRef(null);
  const {formId} = useFormId();

  useEffect(() => {
    fetchResponseCount();
    try{
      const res = axios.get(`${BackEnd_Url}/api/form/readStatus/${formId}`);
      res.then((resolve) => {
        console.log(resolve.data);
        setAccepting(resolve.data);
      })
    }catch(err) {
      console.error(err);
    }
  } ,[])

  const fetchResponseCount = () => {
    try{
      const res = axios.get(`${BackEnd_Url}/api/form/responseCount/${formId}`) 
      res.then((resolve) => {
        setResponseCount(resolve.data.count)
      })
    } catch(err) {
      console.log(err);
    }
  }

  const handleAccept = (e) => {
    // console.log(e.target.checked);
    currentCheck.current = e.target.checked
    try{
      const res = axios.put(`${BackEnd_Url}/api/form/statusUpdate/${formId}` , {status:currentCheck.current})
    } catch(err) {
      console.log(err);
    }
    setAccepting(currentCheck.current)
    setAccept(currentCheck.current)
    console.log(currentCheck.current);
  }

  return (
    <div>
      <Paper className="paper ">
        <Tabs
          className="tabs"
          textColor='primary'
          indicatorColor='primary'
          centered
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <Tab className="tab hello" label="Questions" {...allyProps(0)} />
          <Tab className="tab" label="Responses" {...allyProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Question_form formId={formId}/>
        </TabPanel>

        <TabPanel value={value} index={1}>
          
          <div className="submit" style={{height: "76vh"}}>
                <div className="user_form">
                        <div className="user_form_section">
                            <div className="user_form_questions">
                              {responseCount}  responses

                              <div className={accepting ? 'accepting' : 'accepting not'}>
                                <div className='accepting' >
                                  {accepting ? 'Accepting Responses' : 'Not Accepting Responses'} <Switch checked={accepting} onChange={(e) => {handleAccept(e)}} color='primary' size="small" />
                                </div>
                              </div>
                            </div>
                                <div style={{display: "flex" ,flexDirection: "row" ,alignItems: "center" ,justifycontent: "space-between"}}>
                                  <Typography style={{fontSize:"15px" , fontWeight:"400",letterSpacing:".1px",lineHeight:"24px",paddingBottom:"8px"}}></Typography>
                                </div>

                                {/* <div>
                                  <IconButton>
                                    <MoreVert className='form_header-icon' />
                                  </IconButton>
                                </div> */}
                        </div>

                        <br />
                        
                </div>
                <div className='user_footer'>
                  Google Forms
                </div>
              </div>
        </TabPanel>
      </Paper>
    </div>
  );
}

export default CenteredTabs;
