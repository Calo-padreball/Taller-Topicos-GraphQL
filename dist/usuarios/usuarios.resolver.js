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
exports.UsuariosResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const usuarios_service_1 = require("./usuarios.service");
const usuario_entity_1 = require("./entities/usuario.entity");
const create_usuario_input_1 = require("./dto/create-usuario.input");
const update_usuario_input_1 = require("./dto/update-usuario.input");
let UsuariosResolver = class UsuariosResolver {
    usuarioService;
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    findAll() {
        return this.usuarioService.findAll();
    }
    findOne(id) {
        return this.usuarioService.findOne(id);
    }
    createUsuario(input) {
        return this.usuarioService.create(input);
    }
    updateUsuario(input) {
        return this.usuarioService.update(input.id, input);
    }
    removeUsuario(id) {
        return this.usuarioService.remove(id);
    }
};
exports.UsuariosResolver = UsuariosResolver;
__decorate([
    (0, graphql_1.Query)(() => [usuario_entity_1.Usuario], { name: 'obtenerTodosLosUsuarios' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => usuario_entity_1.Usuario, { name: 'obtenerUsuarioPorId' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => usuario_entity_1.Usuario, { name: 'crearUsuario' }),
    __param(0, (0, graphql_1.Args)('createUsuarioInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_input_1.CreateUsuarioInput]),
    __metadata("design:returntype", void 0)
], UsuariosResolver.prototype, "createUsuario", null);
__decorate([
    (0, graphql_1.Mutation)(() => usuario_entity_1.Usuario, { name: 'actualizarUsuario' }),
    __param(0, (0, graphql_1.Args)('updateUsuarioInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_usuario_input_1.UpdateUsuarioInput]),
    __metadata("design:returntype", void 0)
], UsuariosResolver.prototype, "updateUsuario", null);
__decorate([
    (0, graphql_1.Mutation)(() => usuario_entity_1.Usuario, { name: 'eliminarUsuario' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosResolver.prototype, "removeUsuario", null);
exports.UsuariosResolver = UsuariosResolver = __decorate([
    (0, graphql_1.Resolver)(() => usuario_entity_1.Usuario),
    __metadata("design:paramtypes", [usuarios_service_1.UsuarioService])
], UsuariosResolver);
//# sourceMappingURL=usuarios.resolver.js.map