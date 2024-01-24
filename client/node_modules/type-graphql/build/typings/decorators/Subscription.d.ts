import { type ResolverFn } from "graphql-subscriptions";
import { type MergeExclusive } from "../typings/index.js";
import { type AdvancedOptions, type ReturnTypeFunc, type SubscriptionFilterFunc, type SubscriptionTopicFunc } from "./types.js";
interface PubSubOptions {
    topics: string | string[] | SubscriptionTopicFunc;
    filter?: SubscriptionFilterFunc;
}
interface SubscribeOptions {
    subscribe: ResolverFn;
}
export type SubscriptionOptions = AdvancedOptions & MergeExclusive<PubSubOptions, SubscribeOptions>;
export declare function Subscription(options: SubscriptionOptions): MethodDecorator;
export declare function Subscription(returnTypeFunc: ReturnTypeFunc, options: SubscriptionOptions): MethodDecorator;
export {};
