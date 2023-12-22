import { type MiddlewareFn } from "../typings/Middleware.js";
export declare function createMethodDecorator<TContextType extends object = object>(resolver: MiddlewareFn<TContextType>): MethodDecorator;
