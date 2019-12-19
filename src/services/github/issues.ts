
import axios, { AxiosError } from 'axios';
import { App } from '@octokit/app';
import { Context, Result } from '../../models';
import { config } from '../../config';
import { GithubService } from './base';

export class GithubIssuesService extends GithubService {

    constructor() { 
        super() 
    }

    async get(context: Context, params: any) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.get(`/repos/${context.repo}/issues`, { headers: {'Authorization': `Bearer ${token}`}, params: params })
                .then((response) => {
                    return resolve({ status: response.status, data: response.data })
                }, (error: AxiosError) => { 
                    return resolve(this.error(error)) 
                })
        });
    };

    async getSingle(context: Context, number: string) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.get(`/repos/${context.repo}/issues/${number}`, { headers: {'Authorization': `Bearer ${token}`} })
                .then((response) => {
                    return resolve({ status: response.status, data: response.data })
                }, (error: AxiosError) => { 
                    return resolve(this.error(error)) 
                })
        });
    }

    async create(context: Context, model: any) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.post(`/repos/${context.repo}/issues`, model, { headers: {'Authorization': `Bearer ${token}`}})
                .then((response) => {
                    return resolve({ status: response.status, data: response.data });
                }, (error: AxiosError) => {
                    return resolve(this.error(error)) 
                });    
        });
    }

    async edit(context: Context, number: string, model: any) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.patch(`/repos/${context.repo}/issues/${number}`, model, { headers: {'Authorization': `Bearer ${token}`}})
                .then((response) => {
                    return resolve({ status: response.status, data: response.data });
                }, (error: AxiosError) => {
                    return resolve(this.error(error)) 
                });    
        });
    }

    async lock(context: Context, number: string, model: any) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.put(`/repos/${context.repo}/issues/${number}/lock`, model, { headers: {'Authorization': `Bearer ${token}`}})
                .then((response) => {
                    return resolve({ status: response.status, data: response.data });
                }, (error: AxiosError) => {
                    return resolve(this.error(error)) 
                });    
        });
    }

    async unlock(context: Context, number: string) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.delete(`/repos/${context.repo}/issues/${number}/lock`, { headers: {'Authorization': `Bearer ${token}`}})
                .then((response) => {
                    return resolve({ status: response.status, data: response.data });
                }, (error: AxiosError) => {
                    return resolve(this.error(error)) 
                });    
        });
    }
}