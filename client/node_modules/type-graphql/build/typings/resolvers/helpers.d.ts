import { type PubSubEngine } from "graphql-subscriptions";
import { type ParamMetadata } from "../metadata/definitions/index.js";
import { type ValidateSettings } from "../schema/build-context.js";
import { type AuthChecker, type AuthMode, type ResolverData, type ValidatorFn } from "../typings/index.js";
import { type Middleware } from "../typings/Middleware.js";
import { type IOCContainer } from "../utils/container.js";
export declare function getParams(params: ParamMetadata[], resolverData: ResolverData<any>, globalValidate: ValidateSettings, validateFn: ValidatorFn | undefined, pubSub: PubSubEngine): Promise<any[]> | any[];
export declare function applyAuthChecker(middlewares: Array<Middleware<any>>, authChecker: AuthChecker<any, any> | undefined, container: IOCContainer, authMode: AuthMode, roles: any[] | undefined): void;
export declare function applyMiddlewares(container: IOCContainer, resolverData: ResolverData<any>, middlewares: Array<Middleware<any>>, resolverHandlerFunction: () => any): Promise<any>;
