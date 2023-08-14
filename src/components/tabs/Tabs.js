import React, { useState } from 'react';
import { IconButton, Paper, Switch, Tabs, Typography } from '@mui/material';
import { Tab } from '@mui/material';
import PropTypes from 'prop-types';
import Question_form from "../questionForm/QuestionForm";
import { MoreVert } from '@mui/icons-material';
import "./tab.css"


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
          <Question_form />
        </TabPanel>

        <TabPanel value={value} index={1}>
          
          <div className="submit" style={{height: "76vh"}}>
                <div className="user_form">
                        <div className="user_form_section">
                            <div className="user_form_questions" style={{display: "flex" ,flexDirection: "column" ,marginBottom: "20px"}}></div>
                                <div style={{display: "flex" ,flexDirection: "row" ,alignItems: "center" ,justifycontent: "space-between"}}>
                                  <Typography style={{fontSize:"15px" , fontWeight:"400",letterSpacing:".1px",lineHeight:"24px",paddingBottom:"8px"}}></Typography>
                                </div>

                                <div>
                                  <IconButton>
                                    <MoreVert className='form_header-icon' />
                                  </IconButton>
                                </div>
                        </div>

                        <br />
                        <div style={{marginBottom:"5px"}}>
                          <div style={{display:"flex",fontSize:"12px",justifyContent:"flex-end"}}>
                            Accepting Responses <Switch color='primary' size="small" />
                          </div>
                        </div>
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
