"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const access_auth_1 = require("../decorators/access.auth");
const accessNotRequired_auth_1 = require("../decorators/accessNotRequired.auth");
const internalRoute_auth_1 = require("../decorators/internalRoute.auth");
const permission_auth_1 = require("../decorators/permission.auth");
const publicRoute_auth_1 = require("../decorators/publicRoute.auth");
let JwtAuthGuard = class JwtAuthGuard extends passport_1.AuthGuard('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        if (this.isPublicRoute(context))
            return true;
        if (this.isInternalRoute(context)) {
            this.validateInternalRouteAuthentication(context);
            return true;
        }
        if (!this.IsRouteWithAccessNotRequired(context))
            this.validateAccessAndPermission(context);
        return super.canActivate(context);
    }
    isPublicRoute(context) {
        return this.getReflectionData(context, publicRoute_auth_1.PUBLIC_ROUTE);
    }
    isInternalRoute(context) {
        return this.getReflectionData(context, internalRoute_auth_1.INTERNAL_ROUTE);
    }
    IsRouteWithAccessNotRequired(context) {
        return this.getReflectionData(context, accessNotRequired_auth_1.ACCESS_NOT_REQUIRED);
    }
    validateInternalRouteAuthentication(context) {
        const { headers: { authorization } } = context.switchToHttp().getRequest();
        if (!authorization) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
        const options = {
            secret: process.env.INTERNAL_JWT_SECRET_KEY,
            verifyOptions: {
                ignoreExpiration: true
            }
        };
        const jwtService = new jwt_1.JwtService(options);
        try {
            jwtService.verify(authorization.replace('Bearer ', ''));
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    validateAccessAndPermission(context) {
        const requiredAccess = this.getReflectionData(context, access_auth_1.ENABLED_ACCESS);
        if (!requiredAccess)
            return;
        const { accesses, ...token } = this.getAuthenticationToken(context);
        const requiredPermission = this.getReflectionData(context, permission_auth_1.ENABLED_PERMISSION);
        if (!accesses ||
            !accesses.split(',').includes(requiredAccess) ||
            (requiredPermission &&
                !JSON.parse(token[requiredAccess])
                    .permissions.split(',')
                    .includes(requiredPermission)))
            throw new common_1.ForbiddenException();
    }
    getReflectionData(context, metadataKey) {
        return this.reflector.getAllAndOverride(metadataKey, [
            context.getHandler(),
            context.getClass()
        ]);
    }
    getAuthenticationToken(context) {
        const { headers: { authorization } } = context.switchToHttp().getRequest();
        if (!authorization) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
        const options = {
            secret: process.env.JWT_SECRET_KEY,
            verifyOptions: {
                ignoreExpiration: true
            }
        };
        const jwtService = new jwt_1.JwtService(options);
        return jwtService.verify(authorization.replace('Bearer ', ''));
    }
};
JwtAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt.auth.guard.js.map