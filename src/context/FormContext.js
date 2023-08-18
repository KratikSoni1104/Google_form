import { createContext, useContext, useState } from 'react';

const FormIdContext = createContext();

export function useFormId() {
  return useContext(FormIdContext);
}

export function FormIdProvider({ children }) {
  const [formId, setFormId] = useState(null);

  return (
    <FormIdContext.Provider value={{ formId, setFormId }}>
      {children}
    </FormIdContext.Provider>
  );
}
