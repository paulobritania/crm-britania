"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRoute = exports.PUBLIC_ROUTE = void 0;
const common_1 = require("@nestjs/common");
exports.PUBLIC_ROUTE = 'public_route';
const PublicRoute = () => common_1.SetMetadata(exports.PUBLIC_ROUTE, true);
exports.PublicRoute = PublicRoute;
//# sourceMappingURL=publicRoute.auth.js.map