import { RepresentativePreRegistrationMailDto } from "../dtos/representativePreRegistrationMail.dto";
import { MailService } from "./mail.service"

export declare class RepresentativePreRegistrationMailService extends MailService {
  sendMail(to: string, content: RepresentativePreRegistrationMailDto): Promise<void>
}
export {};
