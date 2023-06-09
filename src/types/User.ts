export interface UserCreate {
  name: string,
  email: string,
  password: string
}

export interface UserLogin {
  email: string,
  password: string
}

export interface CurrentUser {
  id: number,
  name: string,
  token: string
}