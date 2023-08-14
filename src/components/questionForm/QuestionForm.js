import React, { useContext, useEffect, useState } from 'react'
import "./questionForm.css"
import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, MenuItem, Select, Switch } from '@mui/material'
import {Typography} from '@mui/material'
import { FormControlLabel } from '@mui/material';
import { AddCircleOutline, CheckBox, Close, CropOriginal, DragIndicator, FilterNone, MoreVert, OndemandVideo, Radio, ShortText, Subject, TextFields } from '@mui/icons-material';
import {BsFileText, BsTrash} from "react-icons/bs"
import {FcRightUp} from "react-icons/fc"
import "./questionForm.css"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from "axios"
import { useLocation, useParams } from 'react-router-dom';
import { useStateValue } from '../../Store/Store';
import { actionTypes } from '../../Reducer/reducer';

function QuestionForm() {

    const [docName , setDocName] = useState("Untitled document")

    const [docDesc , setDocDesc] = useState("Add Description")
    const location = useLocation();
    const id = location.state.id;

    // console.log(id);
    const [{} , dispatch] = useStateValue()

    const [questions , setQuestions] = useState([
    //     {question : "Which is the capital city of Rajasthan ?",
    //     questionType :"radio",
    //     options : [
    //         {optionsText:"Jaipur"},
    //         {optionsText:"Uaipur"},
    //         {optionsText:"Ajmer"},
    //         {optionsText:"Kota"},
    //     ],
    //     answer:false,
    //     answerKey:"",
    //     points:0,
    //     open : true,
    //     required:false
    // }
    ])

    useEffect(() => {
        const data_adding = async () => {
            try {
                const res = await axios.get(`/api/form/data/${id}`);
                var question_data = res.data.questions;
                var doc_desc = res.data.doc_desc;
                var document_name = res.data.doc_name;
    
                // console.log(question_data);
                // console.log(doc_desc);
                // console.log(document_name);
    
                setDocDesc(doc_desc);
                setDocName(document_name);
    
                if (question_data) {
                    setQuestions(question_data);
                }
    
                dispatch({
                    type: "SET_DOC_NAME",
                    doc_name: document_name,
                });
    
                dispatch({
                    type: "SET_DOC_DESC",
                    doc_desc: doc_desc,
                });
    
                dispatch({
                    type: "SET_QUESTIONS",
                    questions: question_data,
                });
    
                //console.log(question_data);
            } catch (err) {
                console.log(err);
                // Handle the error condition if needed
            }
        };
        data_adding();
    }, []);
    

    

    function handleQuestion(e , i) {
        var newQues = [...questions]
        newQues[i].question = e.target.value
        setQuestions(newQues)
    }

    function handleQuestionType(type,  i ) {
        var newQues = [...questions]
        newQues[i].questionType = type
        setQuestions(newQues)
    }

    function handleInput(e, i , j) {
        var newQues = [...questions]
        newQues[i].options[j].optionsText = e.target.value
        setQuestions(newQues)
    }

    function deleteInput(i , j) {
        var newQues = [...questions]
        newQues[i].options = newQues[i].options.filter((item , idx) => (idx !== j))
        setQuestions(newQues)
    }

    function addOption(i) {
        var newQues = [...questions]
        newQues[i].options.push({optionsText:"option "+ (newQues[i].options.length+1)})
        setQuestions(newQues)
    }

    const copyQuestion = (i) => {
        expandCloseAll();
        var newQues = {...questions[i]};
        setQuestions([...questions , newQues])
    }

    function changeQuestion(type , i) {
        var newQues = [...questions]
        newQues = newQues.filter((ques , idx) => (idx !== i))
        setQuestions(newQues)
    }

    function addRequired(e , i) {
        var newQues = [...questions]
        newQues[i].required = e.target.checked;
        setQuestions(newQues)
    }

    const addNewQuestion = () => {

        expandCloseAll();
        setQuestions(prev => ([...prev , {
            question:"Question",
            questionType:"radio",
            options:[{optionsText:"option 1"}],
            open:true,
            required:false
        }]))
    }

    function onDragEnd(result){
        //console.log(result);
        if (!result.destination){
          return;
        }
        const itemF = reorder(
          questions,
          result.source.index,
          result.destination.index
        )
        setQuestions(itemF);
    }
   
    const reorder = (list, startIndex, endIndex)  => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    const expandCloseAll = () => {
        var newQues = [...questions]
        newQues.forEach(ques => {
            ques.open = false;
        });
        setQuestions(newQues);
    }

    const handleExpand = (idx) => {
        var newQues = [...questions]
        for(var i = 0 ; i < newQues.length ; i++) {
            if(i === idx) {
                newQues[i].open = true
            } else {
                newQues[i].open = false
            }
        }
        setQuestions(newQues)
    }

    const setOptionAnswers = (what , how , i) => {
        var newQues = [...questions]
        if(what === "points") {
            newQues[i].points = how
        } else if(what === "answer"){
            newQues[i].answer = true
        } else if(what === "done") {
            newQues[i].answer = false
        } else if(what ==="options") {
            newQues[i].answerKey = how
        }
        setQuestions(newQues)
    }

    const commitToDB = async () => {
        dispatch({
            type:"SET_QUESTIONS",
            questions:questions
        })
        
        try{
            await axios.put(`/api/form/updateData/${id}` , {
                doc_name:docName,
                doc_desc:docDesc,
                questions:questions
            })
            //console.log("updated");
        } catch(err) {
            console.log(err);
        }
    }

    

    const questionsUI = () => {
        return questions.map((ques , i) => (
            

            <Draggable key={i} draggableId={i+"id"} index={i}>
                {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <div>
                        <div style={{marginBottom: "0px"}}>
                            <div style={{width: '100%', marginBottom: '0px'}}>
                                <DragIndicator style={{transform:"rotate(-90deg)", color: '#DAE0E2',
                                        position: "relative" ,left: "300px"}} fontSize="small"/>
                            </div>

                            <div>
                                <Accordion expanded={ques.open} className={ques.open ? "add_border" : ""} onChange={() => {handleExpand(i)}}>

                                    <AccordionSummary
                                        aria-controls="panella-content"
                                        id="panella-header"
                                        elevation={1} style={{width: '100%'}}
                                    >

                                        {!ques.open ? (
                                        <div className="saved_questions">


                                        <Typography style={{fontsize: "15px" ,fontweight:"4",letterspacing: '1px' ,lineHeight: '24px',paddingBottom:"8px"}}>
                                        {i+1}.   {ques.question}</Typography>

                                        {ques.options.map((op, j) => (

                                        <div key={j} >

                                        <div style={{display: 'flex'}}>
                                            <FormControlLabel style={{marginLeft: "5px" ,marginBottom: "5px"}} disabled control={<input type={ques.questionType}
                                            color="primary" style={{marginRight: '3px'}} required={ques.type}/>} label={
                                                <Typography styles={{fontFamily: 'Roboto,Arial, sans-serif',
                                                    fontSize: '13px',
                                                    fontweight: '400',
                                                    letterSpacing: '.2px',
                                                    lineHeight: '20px',
                                                    color: '#202124'}}>
                                                    {ques.options[j].optionsText}
                                                </Typography>
                                                }    />
                                            </div>

                                        </div>
                                        ))}
                                        </div>      
                                        ): ""}

                                    </AccordionSummary>

                                    <div className='question_boxes'>
                                        { !ques.answer ? (<AccordionDetails className='add_question'>
                                            <div className='add_question_top'>
                                                <input type="text" className='question' placeholder='Question' value={ques.question} onChange={e => handleQuestion(e , i)}/>
                                                <CropOriginal style={{color:"#5f6368"}} />
                                                <Select>
                                                    <MenuItem id="text" value="text" onClick={() => {handleQuestionType("text" , i)}}><Subject style={{marginRight:"10px" , color:"#70757a"}} />  Paragraph</MenuItem>
                                                    <MenuItem id="checkbox" value="checkbox" onClick={() => handleQuestionType("checkbox" , i)}><CheckBox style={{marginRight:"10px" , color:"#70757a"}}  />  Checkboxes</MenuItem>
                                                    <MenuItem id="radio" value="radio" onClick={() => handleQuestionType("radio" , i)}><Radio style={{marginRight:"10px" , color:"#70757a"}} />  Multiple Choice</MenuItem>
                                                </Select>
                                            </div>

                                            {ques.options.map((op , j) => (
                                                <div className='add_question_body' key={j}>
                                                    {
                                                        (ques.questionType !== "text") ?
                                                        <input type={ques.questionType} style={{marginRight:"10px"}} /> :
                                                        <ShortText style={{marginRight:"10px"}}/>
                                                    }

                                                    <div>
                                                        <input type="text" className='text_input' placeholder='option' value={op.optionsText} onChange={(e) => handleInput(e , i , j)}/>
                                                    </div>

                                                    <CropOriginal style={{color:"#5f6368"}} />
                                                    <IconButton aria-label='delete'>
                                                        <Close onClick={() => deleteInput( i , j)}/>
                                                    </IconButton>
                                                </div>
                                            ))}

                                            {ques.options.length < 5 ?  
                                                <div className='add_question_body' style={{marginLeft:"5px"}}>
                                                    <FormControlLabel disabled control={
                                                        (ques.questionType!=="text") ?
                                                        <input type={ques.questionType} color='primary' inputProps={{'aria-label':'secondary checkbox'}} 
                                                            style={{marginLeft:"10px" , marginRight:"10px"}} disabled
                                                        /> :
                                                        <ShortText style={{marginRight : "10px"}} />
                                                    } label={
                                                        <div>
                                                            <input type="text" className="text-input" style={{outline:"none",border:"none",fontSize: "12px" ,width: "60px"}} placeholder="Add other"></input>
                                                            <Button size="small" style={{textTransform: 'none' ,color: "#4285f4" ,fontSize:"12px" ,fontWeight: "600"}} onClick={() => {addOption(i)}}>'Add Option'</Button>
                                                        </div>
                                                    } />
                                                </div>
                                            : ""}


                                            <div className="add_footer">
                                                <div className="add_question_bottom_left">
                                                    <Button size="small" style={{textTransform: "none" ,color: "84285f4" ,fontSize: "13px" ,fontweight: "600"}} onClick={() => {setOptionAnswers("answer" ,true, i)}}>
                                                    <FcRightUp style={{border: "2px solid #4285f4", padding: "2px" ,marginRight: "8px"}} />   Answer key </Button>
                                                </div>
                                                <div className="add_question_bottom">
                                                    <IconButton aria-label="copy" >
                                                        <FilterNone onClick={() => {copyQuestion(i)}}/>
                                                    </IconButton>
                                                    <IconButton aria-label="delete" >
                                                        <BsTrash onClick={() => changeQuestion("remove" , i)} />
                                                    </IconButton>
                                                        <span style={{color: "asf6368",fontsize: "13px"}}>Required </span> <Switch name="checkedA" colore="primary" check onChange={(e) => (addRequired(e , i) )}/>
                                                    <IconButton>
                                                        <MoreVert />             
                                                    </IconButton>
                                                </div>
                                            </div>
                                            
                                        </AccordionDetails>) : 
                                        

                                        <AccordionDetails className='add_question'>
                                            <div className='top_header'>
                                                Choose Correct Answer
                                            </div>
                                            <div>
                                                <div className='add_question-top'>
                                                    <input type="text" className='question' placeholder='Question' value={ques.question} disabled />
                                                    <input type="number" className='points' min="0" step="1" placeholder='0' onChange={e => {setOptionAnswers("points",e.target.value , i)}}/>
                                                </div>

                                                {ques.options.map((op , j) => (
                                                    <div className='add_question_body' key={j} style={{margin:"5px 8px 0 10px"}}>
                                                        <div key={j}>
                                                            <div style={{display:"flex"}}>
                                                                <div className='form_check'>
                                                                <label style={{fontSize: "13px"}} onClick={() => setOptionAnswers( "options",op.optionsText , i)}>
                                                                {(ques.questionType!=="text") ?
                                                                    <input
                                                                    type={ques.questionType}
                                                                    name={ques.question}
                                                                    value="option3"
                                                                    className="form-check-input"
                                                                    required={ques.required}
                                                                    style={{marginRight: "10px" ,marginBottom: "10px", marginTop: "5px"}} />

                                                                    : <ShortText style={{marginRight: "10px"}} />}

                                                                {ques.options[j].optionsText}
                                                                </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className= "add_question_body">
                                                    <Button size="small" style={{textTransform: "none" ,color: "#4285f4", fontSize:"13px" , fontweight: "600"}}>
                                                    <BsFileText style={{fontSize:"20px" ,marginRight: "8px"}}/>Add Answer Feedback</Button>
                                                </div>
                                                <div className= "add_question_bottom">
                                                        <Button variant="outlined" color="primary" style={{textTransform: "none" ,color: "#4285f4" ,fontSize: "12px" ,marginTop: "12px",fontWeight:"600"}} 
                                                        onClick={() => {setOptionAnswers("done" , false, i)}} >Done</Button>
                                                </div>


                                            </div>

                                        </AccordionDetails>
                                        
                                        }
                                        
                                        {!ques.answer ? <div className='question_edit'>
                                            <AddCircleOutline className='edit' onClick={addNewQuestion}/>
                                            <OndemandVideo className='edit' />
                                            <CropOriginal className='edit' />
                                            <TextFields className='edit' />
                                        </div> : " "}

                                    </div>

                                </Accordion>
                            </div>

                        </div>
                    </div>
                </div>
                )}
            </Draggable>
        ))
    }

  return (
    <div className='question_form'>
        <br />
        <div className='section'>
            <div className='question_title_section'>
                <div className='question_form_top'>
                    <input type= "text" className="question_form_top_name" style={{color: "black"}} placeholder="Untitled document" onChange={(e) => {setDocName(e.target.value)}}/>
                    <input type="text" className="question_form_top_desc" placeholder="Form Description" onChange={e => {setDocDesc(e.target.value)}}/>
                </div>

                {questions.length === 0 && <div className='question_edit top_bar' style={{backgroundColor:"#fff" , borderRadius:"2px"}}>
                    <AddCircleOutline className='edit' onClick={addNewQuestion}/>
                    <OndemandVideo className='edit' />
                    <CropOriginal className='edit' />
                    <TextFields className='edit' />
                </div>}
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='loda'>
                    {
                        (provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}    
                            >

                                {questionsUI()} 
                                {provided.placeholder}

                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>

            <div className='save_form'>
                <Button color='primary' variant='contained' onClick={commitToDB} style={{fontSize:"13px"}}>Save</Button>
            </div>
           
        </div>
    </div>
  )
}

export default QuestionForm
