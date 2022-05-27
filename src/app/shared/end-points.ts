import {environment} from '@env';

export class EndPoints {
  static USERS = environment.REST_FSA + '/users';
  static GENRES = environment.REST_FSA + '/genres';
}
