import { defineConfig } from "cypress";
import ms from 'smtp-tester';



export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      let lastEmail: Record<string, any> = {}
      const port = 7777
      const mailServer = ms.init(port)
      console.log('mail server at port %d', port)

// process all emails
      mailServer.bind((addr, id, email) => {
        console.log('--- email ---')
        console.log(addr, id, email)
        lastEmail[email.headers.to as string] = email.html || email.body
      })


      on('task', {
        resetEmails(email) {
          console.log('reset all emails')
          if (email) {
            delete lastEmail[email]
          } else {
            lastEmail = {}
          }
          return null
        },

        getLastEmail(email) {
          console.log(email);
          console.log(lastEmail);
          console.log(lastEmail[email]);
          // cy.task cannot return undefined
          // thus we return null as a fallback
          return lastEmail[email] || null
        },

        extractConfirmationLink(email) {
          const html = lastEmail[email] || null

        }

      })
    },
  },
});
