import React from 'react'
import FormHeader from '../formHeader/FormHeader'
import CenteredTabs from '../tabs/Tabs'
import QuestionForm from '../questionForm/QuestionForm'
import { useLocation } from 'react-router-dom'

function Form() {
  const location = useLocation();
  const formId = location.state ? location.state.id : null;
  return (
    <div>
        <FormHeader formId={formId}/>
        <CenteredTabs formId={formId}/>
    </div>
  )
}

export default Form