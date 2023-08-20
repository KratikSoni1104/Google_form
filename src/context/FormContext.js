import { createContext, useContext, useState } from 'react';

const FormIdContext = createContext();

export function useFormId() {
  return useContext(FormIdContext);
}

export function FormIdProvider({ children }) {
  const [formId, setFormId] = useState(null);
  const [accept , setAccept] = useState(true);

  return (
    <FormIdContext.Provider value={{ formId, setFormId , accept , setAccept}}>
      {children}
    </FormIdContext.Provider>
  );
}
