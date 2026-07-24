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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const task_estados_enums_1 = require("./enums/task-estados-enums");
let TasksService = class TasksService {
    rutaArchivo = path.resolve(process.cwd(), 'dataBase/tareas.json');
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
        const datos = JSON.parse(contenido);
        datos.registros = datos.registros.map((t) => ({
            ...t,
            fechaCreada: new Date(t.fechaCreada),
        }));
        return datos;
    }
    guardarDatos(datos) {
        fs.writeFileSync(this.rutaArchivo, JSON.stringify(datos, null, 2), 'utf-8');
    }
    create(createTaskInput) {
        if (createTaskInput.titulo.length > 100) {
            throw new common_1.BadRequestException('El título es demasiado largo, no puede superar los 100 caracteres.');
        }
        const baseDatos = this.obtenerDatos();
        const nuevaTarea = {
            idUnic: baseDatos.secuencia,
            titulo: createTaskInput.titulo,
            descripcion: createTaskInput.descripcion ?? 'Sin descripción',
            estado: createTaskInput.estado || task_estados_enums_1.EstadosTask.BACKLOG,
            etiquetas: createTaskInput.etiquetas ?? [],
            fechaCreada: new Date(),
            idUsuario: createTaskInput.idUsuario,
            idProyecto: createTaskInput.idProyecto,
        };
        baseDatos.registros.push(nuevaTarea);
        baseDatos.secuencia += 1;
        this.guardarDatos(baseDatos);
        return nuevaTarea;
    }
    findAll() {
        const baseDatos = this.obtenerDatos();
        return baseDatos.registros;
    }
    findOne(id) {
        const baseDatos = this.obtenerDatos();
        const tarea = baseDatos.registros.find((t) => t.idUnic === id);
        if (!tarea) {
            throw new common_1.NotFoundException(`La tarea con el identificador ${id} no existe en la base de datos.`);
        }
        return tarea;
    }
    update(id, updateTaskInput) {
        const baseDatos = this.obtenerDatos();
        const indice = baseDatos.registros.findIndex((t) => t.idUnic === id);
        if (indice === -1) {
            throw new common_1.NotFoundException(`La tarea con el identificador ${id} no existe en la base de datos.`);
        }
        if (updateTaskInput.titulo && updateTaskInput.titulo.length > 100) {
            throw new common_1.BadRequestException('El título es demasiado largo, no puede superar los 100 caracteres.');
        }
        const tareaActualizada = {
            ...baseDatos.registros[indice],
            ...updateTaskInput,
            idUnic: baseDatos.registros[indice].idUnic,
            fechaCreada: baseDatos.registros[indice].fechaCreada,
        };
        baseDatos.registros[indice] = tareaActualizada;
        this.guardarDatos(baseDatos);
        return tareaActualizada;
    }
    remove(id) {
        const baseDatos = this.obtenerDatos();
        const indice = baseDatos.registros.findIndex((t) => t.idUnic === id);
        if (indice === -1) {
            throw new common_1.NotFoundException(`La tarea con el identificador ${id} no existe en la base de datos.`);
        }
        const tareaEliminada = baseDatos.registros[indice];
        baseDatos.registros.splice(indice, 1);
        this.guardarDatos(baseDatos);
        return tareaEliminada;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map