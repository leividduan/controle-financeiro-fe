import { useState } from 'react';
import Input from '../components/Input';
import LayoutLogin from '../components/LayoutLogin';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(event:React.FormEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);
  }

  function handleEmailChange(event:React.FormEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
  }

  function handlePasswordChange(event:React.FormEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }

  async function handleSubmit(event:React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({name, email, password});
  }

  const error = { message: 'E-mail inválido'};
  return (
    <LayoutLogin>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Realize o cadastro
      </h1>
      <form className="space-y-4 md:space-y-6" action="#" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
          <Input type="text" name="name" id="name" placeholder="Ex: João" required onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <Input type="email" name="email" id="email" placeholder="Ex: joao@company.com" required onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
          <Input type="password" name="password" id="password" placeholder="••••••••" required onChange={handlePasswordChange}/>
        </div>
        
        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Finalizar</button>
      </form>
    </LayoutLogin>

  );
}
 
export default Register;