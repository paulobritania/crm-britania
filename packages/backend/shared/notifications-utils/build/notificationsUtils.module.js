"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsUtilsModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const clientPreRegistration_service_1 = require("./mail/services/clientPreRegistration.service");
const representativePreRegistration_service_1 = require("./mail/services/representativePreRegistration.service");
let NotificationsUtilsModule = class NotificationsUtilsModule {
};
NotificationsUtilsModule = __decorate([
    common_1.Module({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: process.env.MAIL_HOST,
                        port: 587,
                        secure: false,
                        auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASSWORD
                        }
                    },
                    defaults: {
                        from: process.env.MAIL_FROM
                    },
                    template: {
                        dir: path_1.join(__dirname, 'mail/templates/'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true
                        }
                    }
                })
            })
        ],
        providers: [
            clientPreRegistration_service_1.ClientPreRegistrationMailService,
            representativePreRegistration_service_1.RepresentativePreRegistrationMailService
        ],
        exports: [
            clientPreRegistration_service_1.ClientPreRegistrationMailService,
            representativePreRegistration_service_1.RepresentativePreRegistrationMailService
        ]
    })
], NotificationsUtilsModule);
exports.NotificationsUtilsModule = NotificationsUtilsModule;
//# sourceMappingURL=notificationsUtils.module.js.map