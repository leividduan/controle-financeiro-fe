export interface CategoryList {
  data: Category[]
}

export interface Category extends CategoryCreate{
  id: number,
}

export interface CategoryCreate {
  name: string,
  description: string,
  type: string
  is_active: boolean,
  id_user: number
}