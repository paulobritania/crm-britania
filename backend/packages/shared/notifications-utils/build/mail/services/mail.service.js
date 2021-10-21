"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const path = __importStar(require("path"));
class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    send(to, subject, template, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    context, from) {
        return this.mailerService.sendMail({
            to,
            from,
            subject,
            template: path.resolve(__dirname, '..', 'templates', template),
            context
        });
    }
}
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map