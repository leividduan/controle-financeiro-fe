import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserCreate } from '../types/User';
import Input from '../components/Input';
import LayoutLogin from '../components/LayoutLogin';
import useErrors from '../hooks/useErrors';
import isEmailValid from '../utils/isEmailValid';
import UsersService from '../services/UsersService';
import APIError from '../errors/APIError';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();
  const navigate = useNavigate();

  const isFormValid = name && email && password && errors.length === 0;

  function handleNameChange(event:React.FormEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);

    if (!event.currentTarget.value) {
      setError({ field: 'name', message: 'Campo obrigatório.' });
    } else if (event.currentTarget.value.length > 150) {
      setError({ field: 'name', message: 'Nome maior que o permitido.' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event:React.FormEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);

    if (!event.currentTarget.value) {
      setError({ field: 'email', message: 'Campo obrigatório.' });
    } else if (event.currentTarget.value.length > 150) {
      setError({ field: 'email', message: 'E-mail maior que o permitido.' });
    } else if (!isEmailValid(event.currentTarget.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event:React.FormEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);

    if (!event.currentTarget.value) {
      setError({ field: 'password', message: 'Campo obrigatório.' });
    } else if (event.currentTarget.value.length > 150) {
      setError({ field: 'password', message: 'Senha maior que o permitido.' });
    } else {
      removeError('password');
    }
  }

  async function handleSubmit(event:React.SyntheticEvent<HTMLFormElement>) {
    try {
      setIsSubmitting(true);
      event.preventDefault();
  
      const user: UserCreate = {
        name,
        email,
        password
      };
  
      const response  = await UsersService.createUser(user);
      if (response) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify({token: response.acess_token}));
      }
      setIsSubmitting(false);
      navigate('/');
    } catch (err) {
      if(err instanceof APIError){
        if (Object.values(err.body).find(el => el === 'EMAIL_DUPLICADO')) {
          setError({ field: 'email', message: 'Este e-mail já está sendo utilizado.' });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <LayoutLogin>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Realize o cadastro
      </h1>
      <form className="space-y-4 md:space-y-6" action="#" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
          <Input 
            type="text" 
            name="name" 
            id="name"
            placeholder="Ex: João" 
            required 
            onChange={handleNameChange} 
            error={getErrorMessageByFieldName('name')}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <Input 
            type="email" 
            name="email"
            id="email" 
            placeholder="Ex: joao@company.com" 
            required 
            onChange={handleEmailChange}
            error={getErrorMessageByFieldName('email')}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
          <Input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="••••••••" 
            required 
            onChange={handlePasswordChange}
            error={getErrorMessageByFieldName('password')}
            disabled={isSubmitting}
          />
        </div>
        
        <button type="submit" disabled={!isFormValid} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-primary-400 cursor-not-allowed">Finalizar</button>
        <p className="text-sm font-light text-gray-500">
                      Já possui conta? <Link to="/login" className="font-medium text-primary-600 hover:underline">Faça o login!</Link>
        </p>
      </form>
    </LayoutLogin>

  );
}
 
export default Register;