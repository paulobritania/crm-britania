"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BritaniaAuth = exports.JwtStrategy = exports.JwtAuthGuard = void 0;
var jwt_auth_guard_1 = require("./build/auth/jwt.auth.guard");
Object.defineProperty(exports, "JwtAuthGuard", { enumerable: true, get: function () { return jwt_auth_guard_1.JwtAuthGuard; } });
var jwt_strategy_1 = require("./build/auth/jwt.strategy");
Object.defineProperty(exports, "JwtStrategy", { enumerable: true, get: function () { return jwt_strategy_1.JwtStrategy; } });
var britania_auth_1 = require("./build/decorators/britania.auth");
Object.defineProperty(exports, "BritaniaAuth", { enumerable: true, get: function () { return britania_auth_1.BritaniaAuth; } });
//# sourceMappingURL=main.js.map
