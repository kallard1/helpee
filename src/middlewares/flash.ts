declare module "flash" {
  import { NextFunction, Request, RequestHandler, Response } from "express";
  import { format, isArray } from "util";

  interface IFlashOptions {
    unsafe?: boolean;
  }

  export function flash(options?: IFlashOptions): RequestHandler {
    options = options || {};

    let safe: boolean;
    safe = (options.unsafe === undefined) ? true : !options.unsafe;

    return ((req: Request, res: Response, next: NextFunction) => {
      if (req.flash && safe) {

        return next();
      }
      req.flash = _flash;
      next();
    });
  }

  function _flash(type: string, msg: string): any {

    if (this.session === undefined) throw Error("req.flash() requires sessions");

    const msgs = this.session.flash = this.session.flash || {};

    if (type && msg) {
      if (arguments.length > 2 && format) {
        const args = Array.prototype.slice.call(arguments, 1);
        msg = format.apply(undefined, args);
      } else if (isArray(msg)) {
        msg.forEach((val) => {
          (msgs[type] = msgs[type] || []).push(val);
        });
        return msgs[type].length;
      }
      return (msgs[type] = msgs[type] || []).push(msg);
    }
    if (type) {
      const arr = msgs[type];
      delete msgs[type];
      return arr || [];
    }

    this.session.flash = {};
    return msgs;
  }
}
