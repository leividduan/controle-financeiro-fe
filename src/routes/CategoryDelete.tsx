import Modal from '../components/Modal';
import { Category } from '../types/Category';
import { ActionFunctionArgs, Form, redirect, useLoaderData } from 'react-router-dom';
import CategoryService from '../services/CategoryService';
import APIError from '../errors/APIError';

export async function action({ params }:ActionFunctionArgs) {
  try {
    const id = parseInt(params.categoryId ?? '0');
    if (id) {
      await CategoryService.delete(id);
    }
    return redirect('/categories');
  } catch (error) {
    if(error instanceof APIError){
      console.log(error);
    }
  }
}

function CategoryDelete() {
  const category = useLoaderData() as Category;

  return (
    <Modal title="Excluir conta" confirmLabel="Excluir" cancelLabel="Cancelar" formFor="deleteAccount">
      <Form id="deleteAccount" noValidate method="post">
        <h1>Você realmente deseja excluir a categoria <span className="font-bold">&quot;{category?.name}&quot;</span>?</h1>
      </Form>
    </Modal>
  );
}

export default CategoryDelete;