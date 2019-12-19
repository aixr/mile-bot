import { Router, NextFunction, Response, Request } from 'express';
import { GithubIssuesService } from '../../services/github/issues';

export class IssuesController {
    Router = Router();

    constructor(private issues: GithubIssuesService) { 
        this.build() 
    }

    private build() {
        this.Router.get('', this.get);
        this.Router.get('/:issue_number', this.getSingle);
        this.Router.post('', this.create);
        this.Router.patch('/:issue_number', this.edit);
        this.Router.put('/:issue_number/lock', this.lock);
        this.Router.delete('/:issue_number', this.unlock);
    }

    get = (req: Request, res: Response, next: NextFunction) => {
        this.issues.get(res.locals.context, req.query)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }

    getSingle = (req: Request, res: Response, next: NextFunction) => {
        this.issues.getSingle(res.locals.context, req.params.issue_number)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        this.issues.create(res.locals.context, req.body)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }

    edit = (req: Request, res: Response, next: NextFunction) => {
        this.issues.edit(res.locals.context, req.params.issue_number, req.body)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }

    lock = (req: Request, res: Response, next: NextFunction) => {
        this.issues.lock(res.locals.context, req.params.issue_number, req.body)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }

    unlock = (req: Request, res: Response, next: NextFunction) => {
        this.issues.unlock(res.locals.context, req.params.issue_number)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }
}

