"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidator = exports.imageCaching = void 0;
var fs_1 = require("fs");
var sharp_1 = __importDefault(require("sharp"));
/**
 * This middleware is concerned with validating the inputs and checking their presences.
 * @param req
 * @param res
 * @param next
 */
var inputValidator = function (req, res, next) {
  var reqData = req.query;
  if (reqData.filename === undefined) {
    next("File name is missing");
  }
  if (reqData.width === undefined) {
    next("Width is missing");
  }
  if (reqData.height === undefined) {
    next("Height is missing");
  }
  if (isNaN(reqData.width)) {
    next("Width must be a number");
  }
  if (isNaN(reqData.height)) {
    next("Height must be a number");
  }
  if (parseInt(reqData.width) <= 0) {
    next("Width must be > 0");
  }
  if (parseInt(reqData.height) <= 0) {
    next("Height must be > 0");
  }
  next();
};
exports.inputValidator = inputValidator;
/**
 * This middleware is concerned with checking if the image is already processed or not.
 * @param req
 * @param res
 * @param next
 */
var imageCaching = function (req, res, next) {
  return __awaiter(void 0, void 0, void 0, function () {
    var reqData, imagePath;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          reqData = req.query;
          imagePath = "assets/thumb/".concat(reqData.filename, "_thumb.jpg");
          return [
            4 /*yield*/,
            fs_1.promises
              .readFile(imagePath)
              .then(function (file) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var metadata;
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return [
                          4 /*yield*/,
                          (0, sharp_1.default)(file).metadata(),
                        ];
                      case 1:
                        metadata = _a.sent();
                        if (
                          metadata.height == reqData.height &&
                          metadata.width == reqData.width
                        )
                          res.end(file);
                        else next();
                        return [2 /*return*/];
                    }
                  });
                });
              })
              .catch(function () {
                next();
              }),
          ];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
};
exports.imageCaching = imageCaching;
