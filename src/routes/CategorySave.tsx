import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import APIError from '../errors/APIError';
import useErrors from '../hooks/useErrors';
import getCurrentUser from '../utils/getUser';
import { Category, CategoryCreate } from '../types/Category';
import CategoryService from '../services/CategoryService';

interface CategorySaveProp {
  isEdit: boolean
}

function CategorySave({isEdit}:CategorySaveProp) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('INCOME');
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();
  const params = useParams();
  const navigate = useNavigate();

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

  async function handleSubmit(event:React.SyntheticEvent<HTMLFormElement>) {
    try {
      if(!isFormValid) {
        return;
      }

      setIsSubmitting(true);
      event.preventDefault();
      const user = getCurrentUser();
   
      const category: CategoryCreate = {
        name,
        description,
        type,
        is_active: true,
        id_user: user.id
      };

      if (isEdit) {
        const id = parseInt(params.categoryId ?? '0');
        await CategoryService.editCategory(category, id);
      } else {
        await CategoryService.createCategory(category);
      }
      navigate('/categories');
      setIsSubmitting(false);
      
    } catch (err) {
      if(err instanceof APIError){
        console.log(err);
        
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (isEdit) {
    useEffect(() =>{
      async function loadCategory() {
        try {
          const id = parseInt(params.categoryId ?? '0');
          const category:Category = await CategoryService.getById(id);
          setName(category.name);
          setDescription(category.description);
          setType(category.type);
        } catch (error) {
          console.log(error);
        }
      }
      loadCategory();
      setIsLoading(false);
    },[]);
  }


  return (
    <Modal title={isEdit ? 'Editar categoria' : 'Criar categoria'} confirmLabel="Salvar" cancelLabel="Fechar" formFor="categoryForm">
      <form id="categoryForm" className="space-y-4" noValidate onSubmit={handleSubmit}>
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
            disabled={isLoading && !isSubmitting}
          >
            <option value="INCOME">Receita</option>
            <option value="EXPENSE">Despesa</option>
          </select>
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
          <Input 
            type="name" 
            name="name" 
            id="name" 
            placeholder="Ex: Supermercado ou Cuidados pessoais" 
            required
            value={name}
            onChange={handleNameChange} 
            error={getErrorMessageByFieldName('name')}
            disabled={isLoading && !isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
          <Input 
            type="description" 
            name="description" 
            id="description" 
            placeholder="Ex: Despesa criada para gastos com mercado em geral." 
            required
            value={description}
            onChange={handleDescriptionChange} 
            error={getErrorMessageByFieldName('description')}
            disabled={isLoading && !isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
}

export default CategorySave;