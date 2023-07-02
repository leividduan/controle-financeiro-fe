import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { Form, redirect, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import APIError from '../errors/APIError';
import useErrors from '../hooks/useErrors';
import getCurrentUser from '../utils/getUser';
import { Category, CategoryCreate } from '../types/Category';
import CategoryService from '../services/CategoryService';

export async function loader({params}:any) {
  try {
    const id = parseInt(params.categoryId ?? '0');
    if(id) {
      const category:Category = await CategoryService.getById(id);
      return category;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function action({ params, request }:any) {
  try {
    const user = getCurrentUser();
    const formData = await request.formData();

    const category: CategoryCreate = {
      name: formData.get('name'),
      description: formData.get('description'),
      type: formData.get('type'),
      is_active: true,
      id_user: user.id
    };

    const id = parseInt(params.categoryId ?? '0');
    if (id) {
      await CategoryService.editCategory(category, id);
    } else {
      await CategoryService.createCategory(category);
    }
    return redirect('/categories');

  } catch (error) {
    if(error instanceof APIError){
      console.log(error);
    }
  }
}

interface CategorySaveProp {
  isEdit: boolean
}

function CategorySave({isEdit}:CategorySaveProp) {
  const category = useLoaderData() as Category;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('INCOME');
  const [isLoading, setIsLoading] = useState(isEdit);
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

  const isFormValid = name && description && type && errors.length === 0;

  function handleNameChange(event:React.FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'name', message: 'Campo obrigatório.' });
    } else if (event.currentTarget.value && event.currentTarget.value.length > 150) {
      setError({ field: 'name', message: 'Campo maior que o permitido.' });
    } else {
      removeError('name');
    }

    setName(event.currentTarget.value);
  }

  function handleDescriptionChange(event:React.FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'description', message: 'Campo obrigatório.' });
    } else if (event.currentTarget.value && event.currentTarget.value.length > 150) {
      setError({ field: 'description', message: 'Campo maior que o permitido.' });
    } else {
      removeError('description');
    }

    setDescription(event.currentTarget.value);
  }

  function handleTypeChange(event:React.FormEvent<HTMLSelectElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'type', message: 'Campo obrigatório.' });
    } else {
      removeError('type');
    }

    setType(event.currentTarget.value);
  }

  if (isEdit) {
    useEffect(() =>{
      setName(category.name);
      setDescription(category.description);
      setType(category.type);
      setIsLoading(false);
    },[]);
  }


  return (
    <Modal title={isEdit ? 'Editar categoria' : 'Criar categoria'} confirmLabel="Salvar" cancelLabel="Fechar" formFor="categoryForm" cancelTo="/categories" disableConfirmBtn={!isFormValid}>
      <Form id="categoryForm" className="space-y-4" noValidate method="post">
        <div>
          <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900">Tipo</label>
          <select
            className="bg-gray-50 focus:outline-primary-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 disabled:text-gray-400"
            name="type" 
            id="type" 
            placeholder="Ex: Supermercado ou Cuidados pessoais" 
            required
            value={type}
            onChange={handleTypeChange} 
            disabled={isLoading}
          >
            <option value="INCOME">Receita</option>
            <option value="EXPENSE">Despesa</option>
          </select>
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
          <Input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Ex: Supermercado ou Cuidados pessoais" 
            required
            value={name}
            onChange={handleNameChange} 
            error={getErrorMessageByFieldName('name')}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
          <Input 
            type="text" 
            name="description" 
            id="description" 
            placeholder="Ex: Despesa criada para gastos com mercado em geral." 
            required
            value={description}
            onChange={handleDescriptionChange} 
            error={getErrorMessageByFieldName('description')}
            disabled={isLoading}
          />
        </div>
      </Form>
    </Modal>
  );
}

export default CategorySave;