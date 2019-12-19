
import axios, { AxiosError } from 'axios';
import { App } from '@octokit/app';
import { Context, Result } from '../../models';
import { config } from '../../config';
import { GithubService } from './base';

export class GithubCommentsService extends GithubService {

    constructor() { 
        super() 
    }

    async get(context: Context, issue_number: string, params: any) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.get(`/repos/${context.repo}/issues/${issue_number}/comments`, { headers: {'Authorization': `Bearer ${token}`}, params: params })
                .then((response) => {
                    return resolve({ status: response.status, data: response.data })
                }, (error: AxiosError) => { 
                    return resolve(this.error(error)) 
                })
        });
    };

    async getSingle(context: Context, comment_id: string) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.get(`/repos/${context.repo}/issues/comments/${comment_id}`, { headers: {'Authorization': `Bearer ${token}`} })
                .then((response) => {
                    return resolve({ status: response.status, data: response.data })
                }, (error: AxiosError) => { 
                    return resolve(this.error(error)) 
                })
        });
    }

    async create(context: Context, issue_number: string, model: any) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.post(`/repos/${context.repo}/issues/${issue_number}/comments`, model, { headers: {'Authorization': `Bearer ${token}`}})
                .then((response) => {
                    return resolve({ status: response.status, data: response.data });
                }, (error: AxiosError) => {
                    return resolve(this.error(error)) 
                });    
        });
    }

    async edit(context: Context, comment_id: string, model: any) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.patch(`/repos/${context.repo}/issues/comments/${comment_id}`, model, { headers: {'Authorization': `Bearer ${token}`}})
                .then((response) => {
                    return resolve({ status: response.status, data: response.data });
                }, (error: AxiosError) => {
                    return resolve(this.error(error)) 
                });    
        });
    }

    async delete(context: Context, comment_id: string) : Promise<Result> {
        let token = await this.getToken(context);
        return new Promise<Result>((resolve, reject) => {
            this.API.delete(`/repos/${context.repo}/issues/comments/${comment_id}`, { headers: {'Authorization': `Bearer ${token}`}})
                .then((response) => {
                    return resolve({ status: response.status, data: response.data });
                }, (error: AxiosError) => {
                    return resolve(this.error(error)) 
                });    
        });
    }
}