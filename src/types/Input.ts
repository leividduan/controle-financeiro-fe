import { InputError } from './InputError';

export interface Input {
  type: string,
  value: string,
  id: string,
  name: string,
  placeholder: string,
  required: boolean,
  disabled?: boolean
  error?: InputError,
  step?: string,
  min?: string,
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}