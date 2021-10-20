"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BritaniaAuth = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
exports.BritaniaAuth = common_1.createParamDecorator((data, request) => {
    let { authorization } = request.args[0].headers;
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
    authorization = authorization.replace('Bearer ', '');
    const token = jwtService.verify(authorization);
    return token && data
        ? token[data]
        : { ...token, authorization };
});
//# sourceMappingURL=britania.auth.js.map