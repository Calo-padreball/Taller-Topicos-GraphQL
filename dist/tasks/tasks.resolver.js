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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tasks_service_1 = require("./tasks.service");
const task_entity_1 = require("./entities/task.entity");
const create_task_input_1 = require("./dto/create-task.input");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const proyecto_entity_1 = require("../proyectos/entities/proyecto.entity");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const proyectos_service_1 = require("../proyectos/proyectos.service");
let TasksResolver = class TasksResolver {
    tasksService;
    usuariosService;
    proyectosService;
    constructor(tasksService, usuariosService, proyectosService) {
        this.tasksService = tasksService;
        this.usuariosService = usuariosService;
        this.proyectosService = proyectosService;
    }
    findAll() {
        return this.tasksService.findAll();
    }
    findOne(id) {
        return this.tasksService.findOne(id);
    }
    createTask(createTaskInput) {
        return this.tasksService.create(createTaskInput);
    }
    usuario(tarea) {
        return this.usuariosService.findOne(tarea.idUsuario);
    }
    proyecto(tarea) {
        return this.proyectosService.findOne(tarea.idProyecto);
    }
};
exports.TasksResolver = TasksResolver;
__decorate([
    (0, graphql_1.Query)(() => [task_entity_1.Task], { name: 'obtenerTodasLasTareas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => task_entity_1.Task, { name: 'obtenerTareaPorId' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_entity_1.Task, { name: 'crearTarea' }),
    __param(0, (0, graphql_1.Args)('createTaskInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_input_1.CreateTaskInput]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "createTask", null);
__decorate([
    (0, graphql_1.ResolveField)(() => usuario_entity_1.Usuario),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_entity_1.Task]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "usuario", null);
__decorate([
    (0, graphql_1.ResolveField)(() => proyecto_entity_1.Proyecto),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_entity_1.Task]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "proyecto", null);
exports.TasksResolver = TasksResolver = __decorate([
    (0, graphql_1.Resolver)(() => task_entity_1.Task),
    __metadata("design:paramtypes", [tasks_service_1.TasksService,
        usuarios_service_1.UsuarioService,
        proyectos_service_1.ProyectosService])
], TasksResolver);
//# sourceMappingURL=tasks.resolver.js.map