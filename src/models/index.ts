

export interface Context {
    id: string;
    installation: number;
    repo: string;
    permissions: string[]
}


export interface Result<T = any> {
    data?: T;
    error?: string;
    status: number;
}