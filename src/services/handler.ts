import { GithubService } from './github';

export let ServicesFactory: ServicesFactory = {
    GithubService: new GithubService()
};

interface ServicesFactory {
    GithubService: GithubService
}