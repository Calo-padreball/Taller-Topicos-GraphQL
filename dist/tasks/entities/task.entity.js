"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const graphql_1 = require("@nestjs/graphql");
const task_estados_enums_1 = require("../enums/task-estados-enums");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const proyecto_entity_1 = require("../../proyectos/entities/proyecto.entity");
let Task = class Task {
    idUnic;
    titulo;
    descripcion;
    estado;
    etiquetas;
    fechaCreada;
    idUsuario;
    idProyecto;
    usuario;
    proyecto;
};
exports.Task = Task;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], Task.prototype, "idUnic", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Task.prototype, "titulo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Task.prototype, "descripcion", void 0);
__decorate([
    (0, graphql_1.Field)(() => task_estados_enums_1.EstadosTask),
    __metadata("design:type", String)
], Task.prototype, "estado", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], Task.prototype, "etiquetas", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Task.prototype, "fechaCreada", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Task.prototype, "idUsuario", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Task.prototype, "idProyecto", void 0);
__decorate([
    (0, graphql_1.Field)(() => usuario_entity_1.Usuario, { nullable: true }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Task.prototype, "usuario", void 0);
__decorate([
    (0, graphql_1.Field)(() => proyecto_entity_1.Proyecto, { nullable: true }),
    __metadata("design:type", proyecto_entity_1.Proyecto)
], Task.prototype, "proyecto", void 0);
exports.Task = Task = __decorate([
    (0, graphql_1.ObjectType)()
], Task);
//# sourceMappingURL=task.entity.js.map