Object.defineProperty(exports, "__esModule", { value: true });
exports.BritaniaAuth = exports.JwtStrategy = exports.JwtAuthGuard = void 0;
const jwt_auth_guard_1 = require("./build/auth/jwt.auth.guard");

Object.defineProperty(exports, "JwtAuthGuard", {
  enumerable: true,
  get() {
    return jwt_auth_guard_1.JwtAuthGuard;
  },
});
const jwt_strategy_1 = require("./build/auth/jwt.strategy");

Object.defineProperty(exports, "JwtStrategy", {
  enumerable: true,
  get() {
    return jwt_strategy_1.JwtStrategy;
  },
});
const britania_auth_1 = require("./build/decorators/britania.auth");

Object.defineProperty(exports, "BritaniaAuth", {
  enumerable: true,
  get() {
    return britania_auth_1.BritaniaAuth;
  },
});
// # sourceMappingURL=main.js.map
