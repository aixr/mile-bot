
export class GithubIssue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    number: number;
    title: string;
    user: any; //todo
    labels: [string];
    state: string;
    locked: boolean;
    //assignee
    //assignees
    //milestones
    comments: number;
    created_at: Date;
    updated_at: Date;
    closed_at: Date;
    body: string;

    constructor(model: any) { this.fromJSON(model); }

    fromJSON(model: any) {
        this.url = model.url;
        this.repository_url = model.repository_url;
        this.labels_url = model.labels_url;
        this.comments_url = model.comments_url;
        this.events_url = model.events_url;
        this.html_url = model.html_url;
        this.id = model.id;
        this.number = model.number;
        this.title = model.title;
        this.user = model.user;
        this.labels = model.labels;
        this.state = model.state;
        this.locked = model.locked;
        this.comments = model.comments;
        this.created_at = model.created_at;
        this.closed_at = model.closed_at;
        this.updated_at = model.updated_at;
        this.body = model.body;
    }
}

export function list(json: [any]): GithubIssue[] {
    let list: GithubIssue[] = [];
    json.forEach((model, i) => {
        list.push(new GithubIssue(model));
    });
    return list;
}