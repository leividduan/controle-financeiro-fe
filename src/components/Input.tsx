import { Input as InputType } from '../types/Input';

function Input({type, value, id, name, placeholder, required, disabled, error, onChange, min, step} : InputType) {
  const className = `bg-gray-50 focus:outline-primary-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 disabled:text-gray-400 ${error && 'border-red-500 placeholder-red-400 focus:ring-red-500 focus:border-red-500 focus:outline-red-700'}`;

  return (
    <>
      <input 
        type={type}
        value={value}
        name={name} 
        id={id}
        min={min}
        step={step}
        placeholder={placeholder} 
        className={className} 
        required={required} 
        disabled={disabled}
        onChange={onChange}
      />
      {error && <small className='text-red-400'>{error.message}</small>}
    </>
  );
}

export default Input;