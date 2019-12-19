import { API } from './api/api';
import { ServicesFactory } from './services/handler';

let api = new API(ServicesFactory.GithubService);
api.start()


