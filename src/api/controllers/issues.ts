import { Router, NextFunction, Response, Request } from 'express';
import { GithubService } from '../../services/github';

export class IssuesController {
    Router = Router();

    constructor(private githubService: GithubService) { 
        this.build() 
    }

    private build() {
        this.Router.get('', (req: Request, res: Response, next: NextFunction) => {
            return this.get(req, res, next);
        })

        this.Router.get(':id', (req: Request, res: Response, next: NextFunction) => {
            return this.get(req, res, next);
        })

        this.Router.post('', (req: Request, res: Response, next: NextFunction) => { 
            return this.create(req, res, next); 
        })
    }

    get(req: Request, res: Response, next: NextFunction) {
        this.githubService.issues(res.locals.context, req.query)
            .then((result) => {
                res.status(result.status).json(result);
            })
            .catch(console.error);
        return next();
    }

    create(req: Request, res: Response, next: NextFunction) {
        this.githubService.createIssue(res.locals.context, req.body)
            .then((result) => {
                res.status(result.status).json(result);
            })
            .catch(console.error);
        return next();
    }
}

