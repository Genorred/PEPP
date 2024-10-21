// import { Inject, Injectable } from "@nestjs/common";
// import { OAuth2Client } from "google-auth-library";
// import googleConfig from "../config/google.config";
// import { ConfigType } from "@nestjs/config";
// import { GoogleInput } from "./dto/google.dto";
//
// @Injectable()
// export class GoogleService extends OAuth2Client {
//   constructor(
//     @Inject(googleConfig.KEY)
//     private config: ConfigType<typeof googleConfig>,
//   ) {
//     super({
//       clientId: config.clientID,
//       clientSecret: config.clientSecret,
//     });
//   }
//
//   async getTokens(code: string) {
//     try {
//       const { tokens } = await this.getToken({
//         code, // код авторизации
//         client_id: this.config.clientID,
//         redirect_uri: 'https://localhost:3000/api/auth/google/callback', // должен совпадать с тем, что у вас в Google Cloud Console
//       });
//       return tokens;
//     } catch (error) {
//       console.error('Error getting tokens:', error);
//       throw new Error(error);
//     }
//   }
//
//   async verify(googleDto: GoogleInput) {
//     const token = await this.getTokens(googleDto.code)
//     const ticket = await this.verifyIdToken({
//       idToken: token.id_token,
//       audience: this.config.clientID
//     });
//     console.log(token);
//     console.log(ticket)
//     const payload = ticket.getPayload();
//     const userId = payload['sub'];
//     // Если верификация успешна, можно продолжать работу с пользователем
//   }
// }
