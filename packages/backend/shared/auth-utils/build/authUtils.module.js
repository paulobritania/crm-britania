"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtilsModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./auth/jwt.auth.guard");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const access_auth_1 = require("./decorators/access.auth");
const accessNotRequired_auth_1 = require("./decorators/accessNotRequired.auth");
const britania_auth_1 = require("./decorators/britania.auth");
const internalRoute_auth_1 = require("./decorators/internalRoute.auth");
const permission_auth_1 = require("./decorators/permission.auth");
const publicRoute_auth_1 = require("./decorators/publicRoute.auth");
let AuthUtilsModule = class AuthUtilsModule {
};
AuthUtilsModule = __decorate([
    common_1.Module({
        exports: [
            britania_auth_1.BritaniaAuth,
            jwt_strategy_1.JwtStrategy,
            jwt_auth_guard_1.JwtAuthGuard,
            permission_auth_1.RequiredPermission,
            access_auth_1.RequiredAccess,
            publicRoute_auth_1.PublicRoute,
            internalRoute_auth_1.InternalRoute,
            accessNotRequired_auth_1.AccessNotRequired
        ]
    })
], AuthUtilsModule);
exports.AuthUtilsModule = AuthUtilsModule;
//# sourceMappingURL=authUtils.module.js.map