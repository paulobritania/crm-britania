"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredPermission = exports.ENABLED_PERMISSION = void 0;
const common_1 = require("@nestjs/common");
exports.ENABLED_PERMISSION = 'enabled_permission';
const RequiredPermission = (permission) => common_1.SetMetadata(exports.ENABLED_PERMISSION, permission);
exports.RequiredPermission = RequiredPermission;
//# sourceMappingURL=permission.auth.js.map