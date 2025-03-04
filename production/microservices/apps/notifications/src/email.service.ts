import { Injectable } from "@nestjs/common";
import { CreateEmailServerDto } from "./dto/create-email-server.dto";
import { MailerService as MailerMain } from "@nestjs-modules/mailer";
import * as path from "path";
import * as pug from "pug";

@Injectable()
export class EmailService {
  constructor(private readonly mailerMain: MailerMain) {
  }


  /**
   * Sends an email using the provided email server.
   *
   * @param {CreateEmailServerDto} email - The email object containing the recipient, subject, and text.
   * @return {Promise<void>} - A promise that resolves when the email is sent successfully.
   */
  async sendMailSandBox(email: CreateEmailServerDto): Promise<void> {
    const templateFile = path.join(__dirname, "templates/email-confirmation.pug");
    // const fileImg = path.join(__dirname, '../../src/email-server/public/img/amico.png');
    // const socialMediaImg = path.join(__dirname, '../../src/email-server/public/img/social-media.png');
    // const imageData = readFileSync(fileImg).toString('base64');
    // const imageDataSocialMedia = readFileSync(socialMediaImg).toString('base64');

    const data = {
      title: "My title",
      // img: imageData,
      link: "http://localhost:3000/email",
      myDescription: "description"
      // imgSocial: imageDataSocialMedia,
    };

    const render = pug.renderFile(templateFile, data);
    await this._processSendEmail(email.to, email.subject, email.text, render);
  }

  /**
   * Sends an email with the specified details.
   *
   * @param {string} to - The recipient of the email.
   * @param {string} subject - The subject of the email.
   * @param {string} text - The plain text content of the email.
   * @param {string} body - The HTML content of the email.
   * @return {Promise<void>} A promise that resolves when the email is sent successfully.
   */
  async _processSendEmail(to, subject, text, body): Promise<void> {
    await this.mailerMain.sendMail({
      to: to,
      subject: subject,
      text: text,
      html: body
    })
      .then(() => {
        console.log("Email sent");
      })
      .catch((e) => {
        console.log("Error sending email", e);
      });
  }
}


// /**
//  * Sends an email using the provided data.
//  *
//  * @param {object} datamailer - The data for the email.
//  * @param {string} datamailer.templete - The template for the email body.
//  * @param {object} datamailer.dataTemplete - The data to be used in the email template.
//  * @param {string} datamailer.to - The recipient of the email.
//  * @param {string} datamailer.subject - The subject of the email.
//  * @param {string} datamailer.text - The plain text version of the email body.
//  * @return {Promise<void>} A promise that resolves when the email is sent.
//  */
// async sendMail(datamailer): Promise<void> {
//  const render = this._bodytemplete(datamailer.templete, datamailer.dataTemplete);
//  await this._processSendEmail(datamailer.to, datamailer.subject, datamailer.text, render);
// }
