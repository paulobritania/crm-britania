import { ClientPreRegistrationMailDto } from "../dtos/clientPreRegistrationMail.dto";
import { MailService } from "./mail.service"

export declare class ClientPreRegistrationMailService extends MailService {
  sendMail(to: string, content: ClientPreRegistrationMailDto): Promise<void>
}
export {};
