"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Review {
    constructor(comment) {
        this.comment = comment;
        this.date = new Date();
    }
}
exports.default = Review;