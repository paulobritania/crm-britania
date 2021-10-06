import { UnauthorizedException } from '@nestjs/common';
import { VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../dto/jwtPayload.dto';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload, done: VerifiedCallback): Promise<any | UnauthorizedException>;
}
export {};
