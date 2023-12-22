import { type Middleware } from "../../typings/Middleware.js";
export interface MiddlewareMetadata {
    target: Function;
    fieldName: string;
    middlewares: Array<Middleware<any>>;
}
