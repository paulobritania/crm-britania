"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalRoute = exports.INTERNAL_ROUTE = void 0;
const common_1 = require("@nestjs/common");
exports.INTERNAL_ROUTE = 'internal_route';
const InternalRoute = () => common_1.SetMetadata(exports.INTERNAL_ROUTE, true);
exports.InternalRoute = InternalRoute;
//# sourceMappingURL=internalRoute.auth.js.map