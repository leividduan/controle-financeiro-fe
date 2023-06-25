import { useState } from 'react';
import { InputError } from '../types/InputError';

export default function useErrors() {
  const [errors, setErrors] = useState<InputError[]>([]);

  function setError({ field, message }:InputError) {
    const errorAlreadyExists = errors.find((error) => error.field === field);
    if (errorAlreadyExists) {
      return;
    }
    setErrors((prevState) => [...prevState, { field, message }]);
  }

  function removeError(fieldName:string) {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }

  function getErrorMessageByFieldName(fieldName:string) {
    const message = errors.find((error) => error.field === fieldName)?.message;
    if (message) {
      return { field: fieldName, message };
    }
  }

  return { setError, removeError, getErrorMessageByFieldName, errors };
}
