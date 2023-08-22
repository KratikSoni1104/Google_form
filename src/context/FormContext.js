import { createContext, useContext, useEffect, useState } from 'react';

const FormIdContext = createContext();

export function useFormId() {
  return useContext(FormIdContext);
}

export function FormIdProvider({ children }) {
  const fId = JSON.parse(localStorage.getItem("form")) || null
  const [formId, setFormId] = useState(fId);
  const [accept , setAccept] = useState(true);

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(formId));
  }, [formId]);

  return (
    <FormIdContext.Provider value={{ formId, setFormId , accept , setAccept}}>
      {children}
    </FormIdContext.Provider>
  );
}
