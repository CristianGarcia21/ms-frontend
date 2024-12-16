import { Role } from './role.model';

export class User {
  id?:number
  user_id?:string
  username?:string
  email:string
  password:string
  role?: Role
}
