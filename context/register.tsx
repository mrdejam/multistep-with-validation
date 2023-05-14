import { useState, createContext, useContext } from 'react';

export const FormContext = createContext({});

export default function RegisterProvider({ children }: any) {
  const [data, setData] = useState({});

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return (
    <FormContext.Provider value={{ data, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
}

export const useRegisterData = () => useContext(FormContext);
