#!/usr/bin/env node

import express from 'express';
import { createServer } from 'http';

import { IssuesController, CommentsController } from './controllers';

import { GithubIssuesService } from '../services/github/issues';

import { context } from './middleware/context';
import { GithubCommentsService } from 'src/services/github/comments';

export class API {

    private ISSUES_CONTROLLER: IssuesController;
    private COMMENTS_CONTROLLER: CommentsController;

    constructor(
        private issuesService: GithubIssuesService, 
        private commentsService: GithubCommentsService) 
    {
        this.buildApi();
    }

    private api = express();
    private port: number = 8080;

    start() {
        let server = createServer(this.api);
        server.on('error', (error) => { console.log(error); });
        server.on('listening', () => { console.log(`listening on port ${this.port}`); });
        server.listen(this.port);
    }

    private buildApi() {
        this.ISSUES_CONTROLLER = new IssuesController(this.issuesService);
        this.COMMENTS_CONTROLLER = new CommentsController(this.commentsService);

        this.api.set('port', this.port);
        this.api.use(express.json());
        this.api.use(express.urlencoded({ extended: false }));
        this.api.use(context);
        this.api.use('/issues', this.ISSUES_CONTROLLER.Router);
        this.api.use('/comments', this.COMMENTS_CONTROLLER.Router);
    }
}


