import { Injectable, OnModuleInit, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoInput } from './dto/create-proyecto.input';
import { UpdateProyectoInput } from './dto/update-proyecto.input';

/**
 * Servicio encargado de gestionar la logica de negocio de los Proyectos.
 * Controla la persistencia de datos mediante un archivo JSON local.
 */
@Injectable()
export class ProyectosService implements OnModuleInit {
  /**
   * Ruta donde se almacena el archivo de datos persistente para los proyectos.
   * @private
   * @readonly
   */
  private readonly rutaArchivo = path.resolve(process.cwd(), 'dataBase/proyectos.json');

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
   * Lee y parsea los datos actuales del archivo de base de datos.
   * 
   * @private
   * @returns {{ secuencia: number, registros: Proyecto[] }} Objeto que contiene la secuencia autoincremental y el arreglo de proyectos.
   */
  private obtenerDatos(): { secuencia: number; registros: Proyecto[] } {
    const contenido = fs.readFileSync(this.rutaArchivo, 'utf-8');
    return JSON.parse(contenido);
  }

  /**
   * Escribe y persiste la estructura de datos actualizada en el archivo JSON de proyectos.
   * 
   * @private
   * @param {{ secuencia: number, registros: Proyecto[] }} datos: La estructura de datos actualizada a guardar.
   */
  private guardarDatos(datos: { secuencia: number; registros: Proyecto[] }): void {
    fs.writeFileSync(this.rutaArchivo, JSON.stringify(datos, null, 2), 'utf-8');
  }

  /**
   * Registra un nuevo proyecto en la base de datos simulada.
   * Valida que el nombre no esté duplicado y que la descripción no exceda el límite de caracteres.
   * 
   * @param {CreateProyectoInput} input: Parámetros de entrada con los datos del nuevo proyecto.
   * @returns {Proyecto} El proyecto recién creado con su ID que se autoincrementa despues de crear uno.
   * @throws {BadRequestException} Si el nombre del proyecto ya existe en los registros o la descripción supera los 200 caracteres.
   */
  create(input: CreateProyectoInput): Proyecto {
    const baseDatos = this.obtenerDatos();

    const existeNombre = baseDatos.registros.some((p: Proyecto) => p.nombre === input.nombreProyec);
    if (existeNombre) {
      throw new BadRequestException('Ese nombre ya está registrado en un proyecto.');
    }

    if (input.descriProyec && input.descriProyec.length > 200) {
      throw new BadRequestException('La descripción no puede superar los 200 caracteres.');
    }

    const nuevoProyecto: Proyecto = {
      id: baseDatos.secuencia,
      nombre: input.nombreProyec,
      descripcion: input.descriProyec,
    };

    baseDatos.registros.push(nuevoProyecto);
    baseDatos.secuencia += 1;
    this.guardarDatos(baseDatos);

    return nuevoProyecto;
  }

  /**
   * Recupera la totalidad de proyectos almacenados en el JSON.
   * 
   * @returns {Proyecto[]} Un arreglo con todos los proyectos registrados.
   */
  findAll(): Proyecto[] {
    const baseDatos = this.obtenerDatos();
    return baseDatos.registros;
  }

  /**
   * Busca un proyecto específico a través de su identificador único.
   * 
   * @param {number} id: Identificador único del proyecto a buscar.
   * @returns {Proyecto} El proyecto correspondiente al ID dado.
   * @throws {NotFoundException} Si no se encuentra un proyecto con el ID especificado.
   */
  findOne(id: number): Proyecto {
    const baseDatos = this.obtenerDatos();
    const proyecto = baseDatos.registros.find((p: Proyecto) => p.id === id);
    if (!proyecto) {
      throw new NotFoundException(`El proyecto con el ID ${id} no fue encontrado.`);
    }
    return proyecto;
  }

  /**
   * Modifica los datos de un proyecto ya existente(nombre o descripción).
   * 
   * @param {number} id: Identificador único del proyecto que se desea modificar.
   * @param {UpdateProyectoInput} input: Datos parciales actualizados del proyecto.
   * @returns {Proyecto} El objeto del proyecto con sus cambios actualizados y guardados.
   * @throws {NotFoundException} Si el proyecto objetivo no es localizado en el JSON.
   * @throws {BadRequestException} Si la nueva descripción excede los 200 caracteres.
   */
  update(id: number, input: UpdateProyectoInput): Proyecto {
    const baseDatos = this.obtenerDatos();
    const indice = baseDatos.registros.findIndex((p: Proyecto) => p.id === id);
    
    if (indice === -1) {
      throw new NotFoundException(`El proyecto con el ID ${id} no fue encontrado.`);
    }
    if (input.descriProyec && input.descriProyec.length > 200) {
      throw new BadRequestException('La descripción no puede superar los 200 caracteres.');
    }

    const proyectoActualizado: Proyecto = {
      ...baseDatos.registros[indice],
      ...(input.nombreProyec && { nombre: input.nombreProyec }),
      ...(input.descriProyec && { descripcion: input.descriProyec }),
    };

    baseDatos.registros[indice] = proyectoActualizado;
    this.guardarDatos(baseDatos);

    return proyectoActualizado;
  }

  /**
   * Elimina de manera permanente un proyecto del JSON.
   * 
   * @param {number} id: Identificador único del proyecto que será eliminad.
   * @returns {Proyecto} El objeto del proyecto que acaba de ser eliminado.
   * @throws {NotFoundException} Si no existe ningún proyecto asignado al ID colocado.
   */
  remove(id: number): Proyecto {
    const baseDatos = this.obtenerDatos();
    const indice = baseDatos.registros.findIndex((p: Proyecto) => p.id === id);
    
    if (indice === -1) {
      throw new NotFoundException(`El proyecto con el ID ${id} no fue encontrado.`);
    }

    const proyectoEliminado = baseDatos.registros[indice];
    baseDatos.registros.splice(indice, 1);
    this.guardarDatos(baseDatos);

    return proyectoEliminado;
  }
}