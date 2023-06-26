export interface AccountList {
  data: Account[]
}

export interface Account extends AccountCreate{
  id: number,
}

export interface AccountCreate {
  name: string,
  is_active: boolean,
  id_user: number
}