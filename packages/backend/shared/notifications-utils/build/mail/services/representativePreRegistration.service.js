"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepresentativePreRegistrationMailService = void 0;
const common_1 = require("@nestjs/common");
const emailTypes_enum_1 = require("../enums/emailTypes.enum");
const mail_service_1 = require("./mail.service");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');
let RepresentativePreRegistrationMailService = class RepresentativePreRegistrationMailService extends mail_service_1.MailService {
    sendMail(to, content) {
        const { companyName, cnpj, taskTitle, ...restContent } = content;
        const formattedCnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1 $2 $3/$4-$5');
        const subject = `${companyName} - ${formattedCnpj} - ${taskTitle}`;
        const body = {
            ...restContent,
            dateLimit: moment(restContent.dateLimit)
                .utcOffset('-0300')
                .format('DD/MM/YYYY HH:mm:ss'),
            responses: restContent.responses.map((response) => ({
                ...response,
                respondedAt: moment(response.respondedAt)
                    .utcOffset('-0300')
                    .format('DD/MM/YYYY HH:mm:ss')
            }))
        };
        return super.send(to, subject, emailTypes_enum_1.EmailTypesEnum.REPRESENTATIVE_PRE_REGISTRATION, body);
    }
};
RepresentativePreRegistrationMailService = __decorate([
    common_1.Injectable()
], RepresentativePreRegistrationMailService);
exports.RepresentativePreRegistrationMailService = RepresentativePreRegistrationMailService;
//# sourceMappingURL=representativePreRegistration.service.js.map