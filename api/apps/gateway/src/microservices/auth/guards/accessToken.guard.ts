// import { Injectable} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';


// @Injectable()
// export class AccessTokenGuard extends AuthGuard('jwt'){
   
// }

// access-token.guard.ts

// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AccessTokenGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!roles) {
//         console.log("============>no roles");
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const accessToken = request.headers.authorization?.split(' ')[1];

//     if (!accessToken) {
//         console.log("====================> no accessToken");
//       return false;
//     }

//     try {
//       const decoded = this.jwtService.verify(accessToken);
//       console.log("============> decoded:",decoded);
//       request.user = decoded;
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const data = context.switchToRpc().getData(); // Extract data from the context


    const isAuthenticated = this.validateAuthentication(data);

    if (!isAuthenticated) {
      // If not authenticated, throw an RpcException
      throw new RpcException('Unauthorized');
    }

    return isAuthenticated;
  }

  private validateAuthentication(data: any): boolean {
    // Replace this with your own authentication logic
    // For example, check if the user is authenticated based on the data received
    // You might validate JWT tokens, check session information, etc.

    // For demonstration purposes, this guard allows all requests.
    // Replace this with your actual authentication logic.
    console.log("=========**===============> ", data);
    return true;
  }
}
