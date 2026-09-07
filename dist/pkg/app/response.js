"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomExpress = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomExpress {
    req;
    res;
    next;
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    successResponse(httpCode, data) {
        let resp = {
            data,
            msg: http_status_codes_1.ReasonPhrases.OK,
            code: httpCode,
        };
        this.res.status(httpCode).json(resp);
        return;
    }
    errorResponse(httpCode, errCode, data) {
        let resp = {
            data,
            msg: http_status_codes_1.ReasonPhrases.OK,
            code: errCode,
        };
        this.res.status(httpCode).json(resp);
        return;
    }
    response200(data) {
        this.successResponse(http_status_codes_1.StatusCodes.OK, data);
    }
    response201(data) {
        this.successResponse(http_status_codes_1.StatusCodes.CREATED, data);
    }
    response400(errCode, data) {
        this.errorResponse(http_status_codes_1.StatusCodes.BAD_REQUEST, errCode, data);
    }
    response401(errCode, data) {
        this.errorResponse(http_status_codes_1.StatusCodes.UNAUTHORIZED, errCode, data);
    }
    response403(errCode, data) {
        this.errorResponse(http_status_codes_1.StatusCodes.FORBIDDEN, errCode, data);
    }
    response404(errCode, data) {
        this.errorResponse(http_status_codes_1.StatusCodes.NOT_FOUND, errCode, data);
    }
    response500(errCode, data) {
        this.errorResponse(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, errCode, data);
    }
}
exports.CustomExpress = CustomExpress;
//# sourceMappingURL=response.js.map