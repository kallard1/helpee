declare namespace Express {
  export interface Request {
    flash(type: string, content: any): any;
  }
}

declare module "flash" {
  interface IFlashOptions {

  }
}
