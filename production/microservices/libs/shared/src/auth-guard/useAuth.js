"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("./jwt-guard");
const UseAuth = () => {
    return (0, common_1.UseGuards)(jwt_guard_1.JwtGuard);
};
exports.default = UseAuth;
//# sourceMappingURL=useAuth.js.map