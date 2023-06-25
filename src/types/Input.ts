import { InputError } from './InputError';

export interface Input {
  type: string,
  id: string,
  name: string,
  placeholder: string,
  required: boolean,
  disabled?: boolean
  error?: InputError,
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}