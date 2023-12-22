import { type ArgsDictionary } from "./ResolverData.js";
import { type ResolverFilterData } from "./ResolverFilterData.js";
export type ResolverTopicData<TPayload = any, TArgs = ArgsDictionary, TContext = {}> = ResolverFilterData<TPayload, TArgs, TContext>;
