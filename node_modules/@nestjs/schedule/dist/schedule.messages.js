"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_SCHEDULER_FOUND = (schedulerName, name) => name
    ? `No ${schedulerName} was found with the given name (${name}). Check that you created one with a decorator or with the create API.`
    : `No ${schedulerName} was found. Check your configuration.`;
exports.DUPLICATE_SCHEDULER = (schedulerName, name) => `${schedulerName} with the given name (${name}) already exists. Ignored.`;
