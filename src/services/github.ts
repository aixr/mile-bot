
import axios, { AxiosError } from 'axios';
import { App } from '@octokit/app';
import { Context, Result } from '../models';
import { config } from '../config';

export class GithubService {

    private app = new App({ id: config.id, privateKey: config.key });
    private api = axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            'Accept': 'application/vnd.github.machine-man-preview+json',
            'User-Agent': config.name
        }
    })
    private _repos: any = {};

    constructor() { }

    async issues(context: Context, params: any) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.api.get(`/repos/${context.repo}/issues`, { headers: {'Authorization': `Bearer ${token}`}, params: params }).then((response) => {
                return resolve({ status: response.status, data: response.data })
            }, (error: AxiosError) => { 
                return this.error(error) 
            })
        });
    }

    async createIssue(context: Context, model: any) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.api.post(`/repos/${context.repo}/issues`, model, { headers: {'Authorization': `Bearer ${token}`}}).then((response) => {
                return resolve({ status: response.status, data: response.data });
            }, (error) => { 
                return this.error(error) 
            });    
        });
    }

    private async installations() : Promise<Result> {
        let bearer = this.app.getSignedJsonWebToken();
        return new Promise<Result>((resolve, reject) => {
            this.api.get(`/app/installations`, { headers: {'Authorization': `Bearer ${bearer}`}}).then((response) => {
                console.log(response.data);
            }, (error) => { 
                return this.error(error) 
            });    
        });
    }

    private async repos(context: Context) : Promise<Result> {
        let token = await this.app.getInstallationAccessToken({ installationId: context.installation });
        return new Promise<Result>((resolve, reject) => {
            this.api.get(`/installation/repositories`, { headers: {'Authorization': `token ${token}`}}).then((response) => {
                response.data.repositories.forEach(repo => {
                    if (repo.full_name.toLowerCase() == context.repo.toLowerCase()) {
                        this._repos[context.id] = {
                            id: repo.id,
                            full_name: repo.full_name,
                            name: repo.name,
                            private: repo.private
                        }
                    }
                });
                return resolve();
            }, (error) => { 
                return this.error(error) 
            });    
        });
    }

    private error (error: AxiosError) : Promise<Result> {
        return new Promise<Result>((resolve, reject) => {
            let err = { status: error.response.status, data: error.response.data, error: error.message };
            return resolve({ status: error.response.status, data: error.response.data, error: error.message })
        })
    }

    private async getToken(context: Context) : Promise<string> {

        if (this._repos[context.id] == undefined) {
            await this.repos(context)
        }

        let token = this._repos[context.id].token; 
        if (token == undefined || token == null) {
            this._repos[context.id].token = token = 
                await this.app.getInstallationAccessToken({ installationId: context.installation, repositoryIds: [this._repos[context.id].id] });
            return new Promise<string> ((resolve) => { return resolve(token) });
        }
        else {
            return new Promise<string> ((resolve) => { return resolve(token) });
        }
    }
}