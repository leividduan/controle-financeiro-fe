import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import LayoutLogin from '../components/LayoutLogin';
import { useState } from 'react';
import useErrors from '../hooks/useErrors';
import { UserLogin } from '../types/User';
import UsersService from '../services/UsersService';
import APIError from '../errors/APIError';
import Title from '../components/Title';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();
  const navigate = useNavigate();

  const isFormValid = email && password && errors.length === 0;

  function handleEmailChange(event:React.FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'email', message: 'Campo obrigatório.' });
    } else {
      removeError('email');
      removeError('password');
    }

    setEmail(event.currentTarget.value);
  }

  function handlePasswordChange(event:React.FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'password', message: 'Campo obrigatório.' });
    } else {
      removeError('password');
      removeError('email');
    }

    setPassword(event.currentTarget.value);
  }

  async function handleSubmit(event:React.SyntheticEvent<HTMLFormElement>) {
    try {
      setIsSubmitting(true);
      event.preventDefault();
  
      const user: UserLogin = {
        email,
        password
      };
  
      const response  = await UsersService.loginUser(user);
      if (response) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(response));
      }
      setIsSubmitting(false);
      navigate('/');
    } catch (err) {
      if(err instanceof APIError){
        if (Object.values(err.body).find(el => el === 'USER_NAO_ENCONTRADO')) {
          setError({ field: 'email', message: ' ' });
          setError({ field: 'password', message: 'E-mail ou senha incorretos.' });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <LayoutLogin>
      <Title>
        Faça o login na plataforma
      </Title>
      <form className="space-y-4 md:space-y-6" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Seu email</label>
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
        <div className="mt-0.5">
          <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Esqueci minha senha</a>
        </div>
        <button type="submit" disabled={!isFormValid} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-primary-400 disabled:cursor-not-allowed">Entrar</button>
        <p className="text-sm font-light text-gray-500">
                      Ainda não possui conta? <Link to="/register" className="font-medium text-primary-600 hover:underline">Faça o cadastro!</Link>
        </p>
      </form>
    </LayoutLogin>
  );
}
 
export default Login;