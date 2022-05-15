import {Role} from '@core/models/role.model';

export interface User {
  username: string;
  password?: string;
  role?: Role;
  token: string;
}
