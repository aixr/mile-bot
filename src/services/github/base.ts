
import axios, { AxiosError } from 'axios';
import { App } from '@octokit/app';
import { Context, Result } from '../../models';
import { config } from '../../config';

export abstract class GithubService {

    private REPOS: any = {};
    protected APP = new App({ id: config.id, privateKey: config.key });
    protected API = axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            'Accept': 'application/vnd.github.machine-man-preview+json',
            'User-Agent': config.name
        }
    })

    constructor() { }

    private async installations() : Promise<Result> {
        let bearer = this.APP.getSignedJsonWebToken();
        return new Promise<Result>((resolve, reject) => {
            this.API.get(`/app/installations`, { headers: {'Authorization': `Bearer ${bearer}`}}).then((response) => {
                console.log(response.data);
            }, (error) => { 
                return resolve(this.error(error)) 
            });    
        });
    }

    private async repos(context: Context) : Promise<Result> {
        let token = await this.APP.getInstallationAccessToken({ installationId: context.installation });
        return new Promise<Result>((resolve, reject) => {
            this.API.get(`/installation/repositories`, { headers: {'Authorization': `token ${token}`}}).then((response) => {
                response.data.repositories.forEach(repo => {
                    if (repo.full_name.toLowerCase() == context.repo.toLowerCase()) {
                        this.REPOS[context.id] = {
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

    protected error (error: AxiosError) : Result {
        let err = { status: error.response.status, data: error.response.data, error: error.message };
        return err;
    }

    protected async getToken(context: Context) : Promise<string> {

        if (this.REPOS[context.id] == undefined) {
            await this.repos(context)
        }

        let token = this.REPOS[context.id].token; 
        if (token == undefined || token == null) {
            this.REPOS[context.id].token = token = 
                await this.APP.getInstallationAccessToken({ installationId: context.installation, repositoryIds: [this.REPOS[context.id].id] });
            return new Promise<string> ((resolve) => { return resolve(token) });
        }
        else {
            return new Promise<string> ((resolve) => { return resolve(token) });
        }
    }
}