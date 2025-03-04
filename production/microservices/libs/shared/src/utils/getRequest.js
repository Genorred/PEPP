"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");

function getRequest(context) {
  const ctx = graphql_1.GqlExecutionContext.create(context);
  console.log("rekvest", ctx.getContext());
  return ctx.getContext().req;
}

exports.default = getRequest;
//# sourceMappingURL=getRequest.js.map