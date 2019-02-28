import { NextFunction, Request, Response } from "express";
import { IFlashOptions } from "flash";

export default function flash() {
  return (request: Request, response: Response, next: NextFunction) => {
    if (request.session.flash) {
      response.locals.flash = request.session.flash;
      request.session.flash = undefined;
    }

    request.flash = (type: string, content: string) => {
      if (request.session.flash === undefined) {
        request.session.flash = {};
      }

      request.session.flash[type] = content;
    };

    next();
  };
}
