import { Link } from 'react-router-dom';
import Input from '../components/Input';
import LayoutLogin from '../components/LayoutLogin';

function Login() {
  const error = { message: 'E-mail inválido'};
  return (
    <LayoutLogin>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Faça o login na plataforma
      </h1>
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Seu email</label>
          <Input type="email" name="email" id="email" placeholder="name@company.com" required />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
          <Input type="password" name="password" id="password" placeholder="••••••••" required />
        </div>
        <div className="mt-0.5">
          <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Esqueci minha senha</a>
        </div>
        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Entrar</button>
        <p className="text-sm font-light text-gray-500">
                      Ainda não possui conta? <Link to="/register" className="font-medium text-primary-600 hover:underline">Faça o cadastro!</Link>
        </p>
      </form>
    </LayoutLogin>

  );
}
 
export default Login;