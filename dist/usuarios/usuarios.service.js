"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let UsuarioService = class UsuarioService {
    rutaArchivo = path.resolve(process.cwd(), 'dataBase/usuarios.json');
    onModuleInit() {
        const directorio = path.dirname(this.rutaArchivo);
        if (!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, { recursive: true });
        }
        if (!fs.existsSync(this.rutaArchivo)) {
            const estadoInicial = { secuencia: 1, registros: [] };
            fs.writeFileSync(this.rutaArchivo, JSON.stringify(estadoInicial, null, 2), 'utf-8');
        }
    }
    obtenerDatos() {
        const contenido = fs.readFileSync(this.rutaArchivo, 'utf-8');
        return JSON.parse(contenido);
    }
    guardarDatos(datos) {
        fs.writeFileSync(this.rutaArchivo, JSON.stringify(datos, null, 2), 'utf-8');
    }
    create(createUsuarioInput) {
        const baseDatos = this.obtenerDatos();
        const correoExiste = baseDatos.registros.some((u) => u.correo.toLowerCase() === createUsuarioInput.correo.toLowerCase());
        if (correoExiste) {
            throw new common_1.BadRequestException('Este correo ya esta registrado');
        }
        const nuevoUsuario = {
            id: baseDatos.secuencia,
            ...createUsuarioInput,
        };
        baseDatos.registros.push(nuevoUsuario);
        baseDatos.secuencia += 1;
        this.guardarDatos(baseDatos);
        return nuevoUsuario;
    }
    findAll() {
        const baseDatos = this.obtenerDatos();
        return baseDatos.registros;
    }
    findOne(id) {
        const baseDatos = this.obtenerDatos();
        const usuario = baseDatos.registros.find((u) => u.id === id);
        if (!usuario) {
            throw new common_1.NotFoundException(`El usuario con el identificador ${id} no existe.`);
        }
        return usuario;
    }
    update(id, updateUsuarioInput) {
        const baseDatos = this.obtenerDatos();
        const indice = baseDatos.registros.findIndex((u) => u.id === id);
        if (indice === -1) {
            throw new common_1.NotFoundException(`El usuario con el identificador ${id} no existe.`);
        }
        const usuarioActualizado = {
            ...baseDatos.registros[indice],
            ...updateUsuarioInput,
            id: baseDatos.registros[indice].id,
        };
        baseDatos.registros[indice] = usuarioActualizado;
        this.guardarDatos(baseDatos);
        return usuarioActualizado;
    }
    remove(id) {
        const baseDatos = this.obtenerDatos();
        const indice = baseDatos.registros.findIndex((u) => u.id === id);
        if (indice === -1) {
            throw new common_1.NotFoundException(`El usuario con el identificador ${id} no existe.`);
        }
        const usuarioEliminado = baseDatos.registros[indice];
        baseDatos.registros.splice(indice, 1);
        this.guardarDatos(baseDatos);
        return usuarioEliminado;
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)()
], UsuarioService);
//# sourceMappingURL=usuarios.service.js.map