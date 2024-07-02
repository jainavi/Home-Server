export interface IExecResponse {
  stdout: string;
  stderr: string;
}

export interface IPrintOptions {
  numberOfCopies?: number;
  toLandScape?: boolean;
  pages?: string;
}

export type ValidHttpCode = 400 | 401 | 403 | 404 | 405 | 409 | 500 | 501 | 503;