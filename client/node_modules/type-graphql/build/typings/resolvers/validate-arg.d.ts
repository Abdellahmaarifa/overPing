import { type TypeValue } from "../decorators/types.js";
import { type ValidateSettings } from "../schema/build-context.js";
import { type ResolverData, type ValidatorFn } from "../typings/index.js";
export declare function validateArg(argValue: any | undefined, argType: TypeValue, resolverData: ResolverData, globalValidate: ValidateSettings, argValidate: ValidateSettings | undefined, validateFn: ValidatorFn | undefined): Promise<any | undefined>;
