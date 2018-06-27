"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message, status) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        return _this;
    }
    return CustomError;
}(Error));
exports.default = CustomError;
//# sourceMappingURL=customError.js.map