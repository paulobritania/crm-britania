"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredAccess = exports.ENABLED_ACCESS = void 0;
const common_1 = require("@nestjs/common");
exports.ENABLED_ACCESS = 'enabled_access';
const RequiredAccess = (access) => common_1.SetMetadata(exports.ENABLED_ACCESS, access);
exports.RequiredAccess = RequiredAccess;
//# sourceMappingURL=access.auth.js.map