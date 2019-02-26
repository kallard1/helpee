declare namespace Express {
  export interface Request {
    flash(): { [key: string]: string[] };

    flash(message: string): any;

    flash(event: string, message: string): any;
  }
}
