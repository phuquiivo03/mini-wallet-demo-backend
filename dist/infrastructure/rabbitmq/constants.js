"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = exports.RoutingKey = exports.MQActions = exports.QueueName = void 0;
var QueueName;
(function (QueueName) {
    QueueName["TRANSACTION"] = "transaction";
    QueueName["QUEUE"] = "app_jobs";
    QueueName["DLQ"] = "jobs_dlq";
    QueueName["WEB3"] = "w3__jobs";
    QueueName["RESIZE"] = "resize__jobs";
    QueueName["EXCHANGE"] = "app_exchange";
    QueueName["DLX"] = "dlx.exchange";
    QueueName["RETRY"] = "retry__jobs";
    QueueName["MINT_RETRY"] = "nft.mint.retryx";
    QueueName["RESIZE_RETRY"] = "image.resize.retryx";
    QueueName["TRANSFER_RETRY"] = "transaction.transfer.retryx";
})(QueueName || (exports.QueueName = QueueName = {}));
var MQActions;
(function (MQActions) {
    MQActions["RESIZE"] = "image.resize";
    MQActions["MINT"] = "nft.mint";
    MQActions["TRANSFER"] = "transaction.transfer";
})(MQActions || (exports.MQActions = MQActions = {}));
var RoutingKey;
(function (RoutingKey) {
    RoutingKey["RESIZE"] = "image.resize";
    RoutingKey["MINT"] = "nft.mint";
    RoutingKey["TRANSFER"] = "transaction.transfer";
    RoutingKey["DLQ"] = "dlq";
})(RoutingKey || (exports.RoutingKey = RoutingKey = {}));
exports.Queue = {
    maxRetries: 3,
};
//# sourceMappingURL=constants.js.map