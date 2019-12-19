import { API } from './api/api';
import { ServicesFactory } from './services/handler';

let api = new API(ServicesFactory.Issues, ServicesFactory.Comments);
api.start()


