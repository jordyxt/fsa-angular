import {Role} from '@core/models/role.model';

export interface User {
  username: string;
  email?: string;
  password?: string;
  role?: Role;
  active?: boolean;
  registrationDate?: Date;
}
