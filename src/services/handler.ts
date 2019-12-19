import { GithubIssuesService } from './github/issues';
import { GithubCommentsService } from './github/comments';

export let ServicesFactory: ServicesFactory = {
    Issues: new GithubIssuesService(),
    Comments: new GithubCommentsService()
};

interface ServicesFactory {
    Issues: GithubIssuesService,
    Comments: GithubCommentsService,
}