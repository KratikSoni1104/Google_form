import React, { useEffect, useState } from 'react'
import {Button, Typography} from '@mui/material'
import { useStateValue } from '../../Store/Store'
import "./viewform.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BackEnd_Url } from '../../services/config';

function ViewForm() {

    const {formId} = useParams();
    var quest = [];
    var post_answer = []
    const [questions, setQuestions] = useState(null);
    const [doc_name , setDoc_name] = useState("");
    const [doc_desc , setDoc_desc] = useState("");
    const [answer , setAnswer] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(formId);
        fetchFormData(formId);
    }, [formId]);

      const fetchFormData = async (formId) => {
        try {
          const response = await axios.get(`${BackEnd_Url}/api/forms/data/${formId}`);
          setQuestions(response.data);
            setDoc_name(response.data.doc_name)
            setDoc_desc(response.data.doc_des)
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        if (questions) {
            questions.forEach(q => (
                answer.push({
                    "question": q.question,
                    "answer": ""
                })
            ));
    
            questions.forEach(q => (
                quest.push({"header": q.question, "key": q.question})
            ));
        }
    }, []); // Add questions as a dependency
    

    const select = (question , option) => {
        var copyAns = [...answer]
        var k = copyAns.findIndex(ele => (ele.question === question))
        copyAns[k].answer = option
        setAnswer(copyAns)
    }

    const selectCheck = (e , que , option) => {
        var d =[]
        var k =answer.findindex((ele)=> (ele.question === que))
        if(answer[k].answer) {
            d=answer[k].answer.split(",")
        }
        if(e === true){
            d.push(option)
        } else{
            var n = d.findIndex(ele => (ele.option === option))
            d.splice(n,1)
        }
        answer[k].answer = d.join(",")
        setAnswer(answer)        
    }

    const selectInput = (question , option) => {
        var copyAns = [...answer]
        var k = copyAns.findIndex(ele => (ele.question === question))
        copyAns[k].answer = option
        setAnswer(copyAns)
    }

    const submit = async () => {

        answer.map(ans => (
            post_answer[ans.question] = ans.answer
        ))

        console.log(post_answer);

        try {
            await axios.post(`${BackEnd_Url}/api/form/student_response/${doc_name}` , {
            "column":quest,
            "answer_data":post_answer
        })
        } catch(err) {
            console.log(err);
        }

        navigate("/submitted")
    }

  return (
    <div className='submit'>
        <div className='user_form'>
            <div className='user_form_section'>
                <div className='user_title_section'>
                    <Typography style={{fontSize:"26px"}}>{doc_name}</Typography>
                    <Typography style={{fontSize:"13px"}}>{doc_desc}</Typography>
                </div>

                {questions && questions.map((question , idx) => (
                    <div className='user_form_questions' key={question.question}>
                        <Typography style={{fontSize:"15px" , fontWeight:"400",letterSpacing:".1px",lineHeight:"24px",paddingBottom:"8px",}}>{idx+1}.  {question.question}</Typography>

                        {question.options.map((op , j) => (

                            <div key={op.optionText} style={{marginBottom:"5px"}}>
                                <div style={{display:"flex"}}>
                                    <div className='form_check'>

                                        {
                                            question.questionType !== "radio" ? (
                                            question.questionType !== "text" ? (
                                            <label>                                                
                                            <input
                                            type={question.questionType}
                                            name={idx}
                                            value={op.optionText}
                                            className="form-check-input"
                                            required={question.required}
                                            style={{margnLeft:"5px",marginRight:"5px"}}
                                            onChange={e => {selectCheck(e.target.checked, question.question , op.optionText)}}
                                            /> {op.optionText}
                                            </label>): (

                                            <label>                                                
                                            <input

                                            type={question.questionType}
                                            name={idx}
                                            value={op.optionText}
                                            className="form-check-input"
                                            required={question.required}
                                            style={{margnLeft:"5px",marginRight:"5px"}}
                                            onChange={e => {selectInput(question.question , e.target.value)}}
                                            /> {op.optionText}
                                            </label>
                                            )
                                            )
 
                                            :(

                                            <label>                                                
                                            <input
                                            type={question.questionType}
                                            name={idx}
                                            value={op.optionText}
                                            className="form-check-input"
                                            required={question.required}
                                            style={{margnLeft:"5px",marginRight:"5px"}}
                                            onChange={e => {select( question.question , op.optionText)}}
                                            /> {op.optionText}
                                            </label>)

                                        }

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
                }

                <div className='user_form_submit'>
                    <Button variant="contained" color="primary" onClick={submit} style={{fontSize:"14px"}}>Submit</Button>
                </div>

                <div className='user_footer'>
                    Google Form
                </div>

            </div>
        </div>
    </div>
  )
}

export default ViewForm