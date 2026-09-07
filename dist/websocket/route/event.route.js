"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_const_1 = require("../events/event.const");
const events_1 = require("../events");
const route = {
    [event_const_1.EVENT_CODE.SEND_NOTIFICATION]: events_1.eventHandler[event_const_1.EVENT_CODE.SEND_NOTIFICATION],
};
exports.default = route;
//# sourceMappingURL=event.route.js.map