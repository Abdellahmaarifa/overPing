import { IRmqSeverName } from '../interface/rmqServerName'


export const RABBIT_SERVICES: Record<IRmqSeverName, { queue: string }> = {
    [IRmqSeverName.PROFILE]: {
        queue: 'profile_queue'
    },
    [IRmqSeverName.AUTH]: {
        queue: 'auth_queue'
    },
    [IRmqSeverName.GATEWAY]: {
        queue: 'gateway_queue'
    },
    [IRmqSeverName.MATCH_MAKING]: {
        queue: 'match_making_queue'
    },
    [IRmqSeverName.MEDIA]: {
        queue: 'media_queue'
    },
    [IRmqSeverName.FRIEND]: {
        queue: 'friend_queue'
    }
}