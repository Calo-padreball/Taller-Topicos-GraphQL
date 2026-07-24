"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadosTask = void 0;
const graphql_1 = require("@nestjs/graphql");
var EstadosTask;
(function (EstadosTask) {
    EstadosTask["BACKLOG"] = "Backlog";
    EstadosTask["TODO"] = "To Do";
    EstadosTask["IN_PROGRESS"] = "In Progress";
    EstadosTask["DONE"] = "Done";
})(EstadosTask || (exports.EstadosTask = EstadosTask = {}));
(0, graphql_1.registerEnumType)(EstadosTask, {
    name: 'EstadosTask',
    description: 'Estados posibles',
});
//# sourceMappingURL=task-estados-enums.js.map