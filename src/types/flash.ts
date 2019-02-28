declare namespace Express {
  export interface Request {
    flash(type: string, content: string): any;
  }
}

declare module "flash" {
  interface IFlashOptions {

  }
}
