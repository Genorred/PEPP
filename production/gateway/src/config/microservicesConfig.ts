import { registerAs } from "@nestjs/config";

const servicesNames = ["USERS", "POSTS"];

export default registerAs("microservicesConfig", () => (
  servicesNames.map((serviceName) => {
    const name = process.env[`${serviceName}_SERVICE_HOST`]
    const port = process.env[`${serviceName}_SERVICE_PORT`] || 5000
    return {
      name,
      url: `http://${name}:${port}/graphql`
    }
  })
));
