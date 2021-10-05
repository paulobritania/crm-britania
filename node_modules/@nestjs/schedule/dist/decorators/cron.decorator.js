"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const scheduler_type_enum_1 = require("../enums/scheduler-type.enum");
const schedule_constants_1 = require("../schedule.constants");
function Cron(cronTime, options = {}) {
    const name = options && options.name;
    return common_1.applyDecorators(common_1.SetMetadata(schedule_constants_1.SCHEDULE_CRON_OPTIONS, Object.assign(Object.assign({}, options), { cronTime })), common_1.SetMetadata(schedule_constants_1.SCHEDULER_NAME, name), common_1.SetMetadata(schedule_constants_1.SCHEDULER_TYPE, scheduler_type_enum_1.SchedulerType.CRON));
}
exports.Cron = Cron;
