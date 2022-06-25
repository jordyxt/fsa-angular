import {environment} from '@env';

export class EndPoints {
  static USERS = environment.REST_FSA + '/users';
  static GENRES = environment.REST_FSA + '/genres';
  static FILMS = environment.REST_FSA + '/films';
  static SERIES = environment.REST_FSA + '/series';
  static RATINGS = environment.REST_FSA + '/ratings';
  static WORKERS = environment.REST_FSA + '/workers';
  static TOPICS = environment.REST_FSA + '/topics';
  static VIDEO_PRODUCTIONS = environment.REST_FSA + '/video-productions';
}
