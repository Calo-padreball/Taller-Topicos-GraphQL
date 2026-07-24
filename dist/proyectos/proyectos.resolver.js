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
exports.ProyectosResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const proyectos_service_1 = require("./proyectos.service");
const proyecto_entity_1 = require("./entities/proyecto.entity");
const create_proyecto_input_1 = require("./dto/create-proyecto.input");
const update_proyecto_input_1 = require("./dto/update-proyecto.input");
let ProyectosResolver = class ProyectosResolver {
    proyectosService;
    constructor(proyectosService) {
        this.proyectosService = proyectosService;
    }
    findAll() {
        return this.proyectosService.findAll();
    }
    findOne(id) {
        return this.proyectosService.findOne(id);
    }
    createProyecto(input) {
        return this.proyectosService.create(input);
    }
    updateProyecto(input) {
        return this.proyectosService.update(input.id, input);
    }
    removeProyecto(id) {
        return this.proyectosService.remove(id);
    }
};
exports.ProyectosResolver = ProyectosResolver;
__decorate([
    (0, graphql_1.Query)(() => [proyecto_entity_1.Proyecto], { name: 'obtenerTodosLosProyectos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProyectosResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => proyecto_entity_1.Proyecto, { name: 'obtenerProyectoPorId' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProyectosResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => proyecto_entity_1.Proyecto, { name: 'crearProyecto' }),
    __param(0, (0, graphql_1.Args)('createProyectoInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proyecto_input_1.CreateProyectoInput]),
    __metadata("design:returntype", void 0)
], ProyectosResolver.prototype, "createProyecto", null);
__decorate([
    (0, graphql_1.Mutation)(() => proyecto_entity_1.Proyecto, { name: 'actualizarProyecto' }),
    __param(0, (0, graphql_1.Args)('updateProyectoInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_proyecto_input_1.UpdateProyectoInput]),
    __metadata("design:returntype", void 0)
], ProyectosResolver.prototype, "updateProyecto", null);
__decorate([
    (0, graphql_1.Mutation)(() => proyecto_entity_1.Proyecto, { name: 'eliminarProyecto' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProyectosResolver.prototype, "removeProyecto", null);
exports.ProyectosResolver = ProyectosResolver = __decorate([
    (0, graphql_1.Resolver)(() => proyecto_entity_1.Proyecto),
    __metadata("design:paramtypes", [proyectos_service_1.ProyectosService])
], ProyectosResolver);
//# sourceMappingURL=proyectos.resolver.js.map