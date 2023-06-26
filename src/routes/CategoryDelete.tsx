import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { Category } from '../types/Category';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryService from '../services/CategoryService';

function CategoryDelete() {
  const [category, setCategory] = useState<Category | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() =>{
    async function loadCategory() {
      try {
        const id = parseInt(params.categoryId ?? '0');
        const category:Category = await CategoryService.getById(id);
        setCategory(category);
      } catch (error) {
        console.log(error);
      }
    }
    loadCategory();
  },[]);

  async function handleOnClickConfirm() {
    try {
      if (!category) {
        return;
      }

      await CategoryService.delete(category.id);
      setCategory(category);
      navigate('/categories');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal title="Excluir conta" confirmLabel="Excluir" cancelLabel="Cancelar" confirmFn={handleOnClickConfirm}>
      <h1>Você realmente deseja excluir a categoria <span className="font-bold">&quot;{category?.name}&quot;</span>?</h1>
    </Modal>
  );
}

export default CategoryDelete;