import http from "http";

const options = {
  host: "localhost",
  port: 8080,
  path: "/health",
  timeout: 2000
};

const request = http.request(options, (res) => {
  process.exitCode = res.statusCode === 200 ? 0 : 1;
  process.exit();
});

request.on("error", () => {
  process.exit(1);
});

request.end();