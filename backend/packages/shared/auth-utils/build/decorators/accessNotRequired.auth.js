"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessNotRequired = exports.ACCESS_NOT_REQUIRED = void 0;
const common_1 = require("@nestjs/common");
exports.ACCESS_NOT_REQUIRED = 'access_not_required';
const AccessNotRequired = () => common_1.SetMetadata(exports.ACCESS_NOT_REQUIRED, true);
exports.AccessNotRequired = AccessNotRequired;
//# sourceMappingURL=accessNotRequired.auth.js.map