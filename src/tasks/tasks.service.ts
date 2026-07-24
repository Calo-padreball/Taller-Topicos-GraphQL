import { Injectable, OnModuleInit, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { EstadosTask } from './enums/task-estados-enums';

/**
 * Servicio encargado de gestionar la lógica de negocio y ciclo de vida de las Tareas.
 * Controla la persistencia de datos mediante un archivo JSON local.
 */
@Injectable()
export class TasksService implements OnModuleInit {
  /**
   * Ruta absoluta donde se almacena el archivo de datos persistente para las tareas.
   * @private
   * @readonly
   */
  private readonly rutaArchivo = path.resolve(process.cwd(), 'dataBase/tareas.json');

  /**
   * Método del ciclo de vida de NestJS que se ejecuta al inicializar el módulo.
   * Crea el directorio y el archivo JSON inicial si no existen en el sistema.
   */
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

  /**
   * Lee y parsea los datos actuales del archivo JSON.
   * Adicionalmente, transforma las cadenas de texto de `fechaCreada` nuevamente a objetos `Date` reales.
   * 
   * @private
   * @returns {{ secuencia: number, registros: Task[] }} Objeto con la secuencia y el arreglo de tareas.
   */
  private obtenerDatos(): { secuencia: number; registros: Task[] } {
    const contenido = fs.readFileSync(this.rutaArchivo, 'utf-8');
    const datos = JSON.parse(contenido);

    datos.registros = datos.registros.map((t: any) => ({
      ...t,
      fechaCreada: new Date(t.fechaCreada),
    }));
    return datos;
  }

  /**
   * Escribe y persiste la estructura de datos actualizada en el archivo JSON de tareas.
   * 
   * @private
   * @param {{ secuencia: number, registros: Task[] }} datos: La estructura de datos actualizada a guardar.
   */
  private guardarDatos(datos: { secuencia: number; registros: Task[] }): void {
    fs.writeFileSync(this.rutaArchivo, JSON.stringify(datos, null, 2), 'utf-8');
  }

  /**
   * Registra una nueva tarea en el sistema.
   * Asigna valores por defecto(como estado BACKLOG o arreglos vacíos) en caso de que falten.
   * 
   * @param {CreateTaskInput} createTaskInput: Datos de entrada para la creación de la tarea.
   * @returns {Task} La tarea recién creada con su identificador y fecha de creación generados.
   * @throws {BadRequestException} Si el título de la tarea supera los 100 caracteres.
   */
  create(createTaskInput: CreateTaskInput): Task {
    if (createTaskInput.titulo.length > 100) {
      throw new BadRequestException('El título es demasiado largo, no puede superar los 100 caracteres.');
    }

    const baseDatos = this.obtenerDatos();

    const nuevaTarea: Task = {
      idUnic: baseDatos.secuencia,
      titulo: createTaskInput.titulo,
      descripcion: createTaskInput.descripcion ?? 'Sin descripción',
      estado: createTaskInput.estado || EstadosTask.BACKLOG,
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

  /**
   * Recupera la totalidad de tareas almacenadas en la base de datos simulada.
   * 
   * @returns {Task[]} Un arreglo con todas las tareas registradas.
   */
  findAll(): Task[] {
    const baseDatos = this.obtenerDatos();
    return baseDatos.registros;
  }

  /**
   * Busca una tarea específica a través de su identificador único.
   * 
   * @param {number} id: Identificador único (`idUnic`) de la tarea a buscar.
   * @returns {Task} La tarea correspondiente al ID suministrado.
   * @throws {NotFoundException} Si la tarea no es encontrada en los registros.
   */
  findOne(id: number): Task {
    const baseDatos = this.obtenerDatos();
    const tarea = baseDatos.registros.find((t: Task) => t.idUnic === id);

    if (!tarea) {
      throw new NotFoundException(`La tarea con el identificador ${id} no existe en la base de datos.`);
    }
    return tarea;
  }

  /**
   * Modifica los datos de una tarea existente.
   * Protege los datos que no se puedan modificar(`idUnic` y `fechaCreada`) para evitar que sean sobrescritos.
   * 
   * @param {number} id: Identificador de la tarea a actualizar.
   * @param {UpdateTaskInput} updateTaskInput: Objeto con los datos parciales a actualizar.
   * @returns {Task} El objeto de la tarea con sus cambios actualizados.
   * @throws {NotFoundException} Si la tarea a modificar no existe.
   * @throws {BadRequestException} Si el nuevo título proporcionado supera los 100 caracteres.
   */
  update(id: number, updateTaskInput: UpdateTaskInput): Task {
    const baseDatos = this.obtenerDatos();
    const indice = baseDatos.registros.findIndex((t: Task) => t.idUnic === id);

    if (indice === -1) {
      throw new NotFoundException(`La tarea con el identificador ${id} no existe en la base de datos.`);
    }

    if (updateTaskInput.titulo && updateTaskInput.titulo.length > 100) {
      throw new BadRequestException('El título es demasiado largo, no puede superar los 100 caracteres.');
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

  /**
   * Elimina de manera permanente una tarea del registro del JSON.
   * 
   * @param {number} id: Identificador de la tarea a eliminar.
   * @returns {Task} La tarea que acaba de ser eliminada.
   * @throws {NotFoundException} Si la tarea a eliminar no existe en los registros.
   */
  remove(id: number): Task {
    const baseDatos = this.obtenerDatos();
    const indice = baseDatos.registros.findIndex((t: Task) => t.idUnic === id);

    if (indice === -1) {
      throw new NotFoundException(`La tarea con el identificador ${id} no existe en la base de datos.`);
    }

    const tareaEliminada = baseDatos.registros[indice];
    baseDatos.registros.splice(indice, 1);
    this.guardarDatos(baseDatos);

    return tareaEliminada;
  }
}