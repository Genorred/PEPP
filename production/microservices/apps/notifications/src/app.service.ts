import { Inject, Injectable } from "@nestjs/common";
import { UserConfirmation } from "./dto/user-confirmation";
import { MailerService } from "@nestjs-modules/mailer";
import * as path from "path";
import * as pug from "pug";
import frontendConfig from "./config/frontend.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private readonly mailerMain: MailerService,
              @Inject(frontendConfig.KEY) private configService: ConfigType<typeof frontendConfig>) {
  }

  async sendApproveEmail(data: UserConfirmation) {

    const url = new URL(`${this.configService.url}/confirm-email`);
    if (data.returnUrl) {
      url.searchParams.append("returnUrl", data.returnUrl);
    }
    url.searchParams.append("token", data.token);

    const templateData = {
      link: url.href
    };
    const templateFile = path.join(__dirname, "templates/email-confirmation.pug");
    const render = pug.renderFile(templateFile, templateData);

    await this.mailerMain.sendMail({
      to: data.email,
      html: render
    })
      .then(() => {
        console.log("Email sent");
      })
      .catch((e) => {
        console.log("Error sending email", e);
      });
  }

}
