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
exports.ProyectosService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let ProyectosService = class ProyectosService {
    rutaArchivo = path.resolve(process.cwd(), 'dataBase/proyectos.json');
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
    create(input) {
        const baseDatos = this.obtenerDatos();
        const existeNombre = baseDatos.registros.some((p) => p.nombre === input.nombreProyec);
        if (existeNombre) {
            throw new common_1.BadRequestException('Ese nombre ya está registrado en un proyecto.');
        }
        if (input.descriProyec && input.descriProyec.length > 200) {
            throw new common_1.BadRequestException('La descripción no puede superar los 200 caracteres.');
        }
        const nuevoProyecto = {
            id: baseDatos.secuencia,
            nombre: input.nombreProyec,
            descripcion: input.descriProyec,
        };
        baseDatos.registros.push(nuevoProyecto);
        baseDatos.secuencia += 1;
        this.guardarDatos(baseDatos);
        return nuevoProyecto;
    }
    findAll() {
        const baseDatos = this.obtenerDatos();
        return baseDatos.registros;
    }
    findOne(id) {
        const baseDatos = this.obtenerDatos();
        const proyecto = baseDatos.registros.find((p) => p.id === id);
        if (!proyecto) {
            throw new common_1.NotFoundException(`El proyecto con el ID ${id} no fue encontrado.`);
        }
        return proyecto;
    }
    update(id, input) {
        const baseDatos = this.obtenerDatos();
        const indice = baseDatos.registros.findIndex((p) => p.id === id);
        if (indice === -1) {
            throw new common_1.NotFoundException(`El proyecto con el ID ${id} no fue encontrado.`);
        }
        if (input.descriProyec && input.descriProyec.length > 200) {
            throw new common_1.BadRequestException('La descripción no puede superar los 200 caracteres.');
        }
        const proyectoActualizado = {
            ...baseDatos.registros[indice],
            ...(input.nombreProyec && { nombre: input.nombreProyec }),
            ...(input.descriProyec && { descripcion: input.descriProyec }),
        };
        baseDatos.registros[indice] = proyectoActualizado;
        this.guardarDatos(baseDatos);
        return proyectoActualizado;
    }
    remove(id) {
        const baseDatos = this.obtenerDatos();
        const indice = baseDatos.registros.findIndex((p) => p.id === id);
        if (indice === -1) {
            throw new common_1.NotFoundException(`El proyecto con el ID ${id} no fue encontrado.`);
        }
        const proyectoEliminado = baseDatos.registros[indice];
        baseDatos.registros.splice(indice, 1);
        this.guardarDatos(baseDatos);
        return proyectoEliminado;
    }
};
exports.ProyectosService = ProyectosService;
exports.ProyectosService = ProyectosService = __decorate([
    (0, common_1.Injectable)()
], ProyectosService);
//# sourceMappingURL=proyectos.service.js.map