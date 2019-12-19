#!/usr/bin/env node

import express from 'express';
import { createServer } from 'http';

import { IssuesController } from './controllers';

import { GithubService } from '../services/github';

import { context } from './middleware/context';

export class API {

    private _issuesController: IssuesController;

    constructor(private githubService: GithubService) {
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
        this._issuesController = new IssuesController(this.githubService);

        this.api.set('port', this.port);
        this.api.use(express.json());
        this.api.use(express.urlencoded({ extended: false }));
        this.api.use(context);
        this.api.use('/', this._issuesController.Router);
    }
}


