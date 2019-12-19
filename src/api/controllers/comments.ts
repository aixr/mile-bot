import { Router, NextFunction, Response, Request } from 'express';
import { GithubCommentsService } from 'src/services/github/comments';

export class CommentsController {
    Router = Router();

    constructor(private comments: GithubCommentsService) { 
        this.build() 
    }

    private build() {
        this.Router.get('/:issue_number', this.get);
        this.Router.get('/s/:comment_id', this.getSingle);
        this.Router.post('/:issue_number', this.create);
        this.Router.patch('/:comment_id', this.edit);
        this.Router.delete('/:comment_id', this.delete);
    }

    get = (req: Request, res: Response, next: NextFunction) => {
        this.comments.get(res.locals.context, req.params.issue_number, req.query)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }

    getSingle = (req: Request, res: Response, next: NextFunction) => {
        this.comments.getSingle(res.locals.context, req.params.comment_id)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        this.comments.create(res.locals.context, req.params.issue_number, req.body)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }

    edit = (req: Request, res: Response, next: NextFunction) => {
        this.comments.edit(res.locals.context, req.params.comment_id, req.body)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        this.comments.delete(res.locals.context, req.params.comment_id)
            .then((result) => {
                return res.status(result.status).json(result);
            })
            .catch(console.error);
    }
}

