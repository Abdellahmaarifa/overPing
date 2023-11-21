import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Inject,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { RabbitMqService } from "@app/rabbit-mq";
import { IAccessControl } from '../../../../../../libs/common/src/auth/interface/AccessToken.interface';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';


export class UserAccessAuthorizationGuard implements CanActivate {
    constructor(
        @Inject(IRmqSeverName.AUTH)
        private readonly authClient: ClientProxy,
        private readonly clientService: RabbitMqService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let req: Request;
        req = context.getArgs()[context.getArgs().length - 2].req;
        if (!req) {
            req = context.switchToHttp().getRequest();
        }

        const authorizationHeader: string = req.headers['authorization'];

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Invalid or missing Authorization header');
        }

        const jwt: string = authorizationHeader.split('Bearer ')[1];

        if (!jwt) throw new UnauthorizedException('User not authenticated');

        const id: number =
            parseInt(req.params.id, 10) || parseInt(context.getArgs()[1].id, 10);

        if (!id) throw new BadRequestException('Missing user ID');

        const accessControlObject: IAccessControl = {
            token: jwt,
            id,
        };

        return this.clientService.sendMessageWithPayload(
            this.authClient,
            { role: 'auth', cmd: 'checkAccess' },
            accessControlObject,
        );
    }
}
