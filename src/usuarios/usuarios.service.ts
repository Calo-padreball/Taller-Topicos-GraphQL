import { Injectable, OnModuleInit, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';

/**
 * Servicio encargado de gestionar la lógica de negocio de los Usuarios.
 * Controla la persistencia de datos mediante un archivo JSON local,
 * Evita que hayan correos duplicados.
 */
@Injectable()
export class UsuarioService implements OnModuleInit {
  /**
   * Ruta absoluta donde se almacena el archivo de datos persistente para los usuarios.
   * @private
   * @readonly
   */
  private readonly rutaArchivo = path.resolve(process.cwd(), 'dataBase/usuarios.json');

  /**
   * Método del ciclo de vida de NestJS que se ejecuta al inicializar el módulo.
   * Verifica la existencia del directorio y del archivo JSON, creándolos con
   * un estado inicial si no se encuentran en el sistema.
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
   * Lee y parsea los datos actuales del archivo JSON de usuarios.
   * 
   * @private
   * @returns {{ secuencia: number, registros: Usuario[] }} Objeto con la secuencia actual y el arreglo de usuarios.
   */
  private obtenerDatos(): { secuencia: number; registros: Usuario[] } {
    const contenido = fs.readFileSync(this.rutaArchivo, 'utf-8');
    return JSON.parse(contenido);
  }

  /**
   * Escribe y persiste la estructura de datos actualizada en el archivo JSON de usuarios.
   * 
   * @private
   * @param {{ secuencia: number, registros: Usuario[] }} datos: La estructura de datos actualizada a guardar.
   */
  private guardarDatos(datos: { secuencia: number; registros: Usuario[] }): void {
    fs.writeFileSync(this.rutaArchivo, JSON.stringify(datos, null, 2), 'utf-8');
  }

  /**
   * Registra un nuevo usuario en el JSON.
   * Valida que el correo electrónico ingresado no se encuentre ya registrado(ignorando mayúsculas/minúsculas).
   * 
   * @param {CreateUsuarioInput} createUsuarioInput: Objeto con los datos del nuevo usuario.
   * @returns {Usuario} El usuario recién creado con su ID que se autoincrementa despues de crear uno.
   * @throws {BadRequestException} Si el correo electrónico ya existe en los registros.
   */
  create(createUsuarioInput: CreateUsuarioInput): Usuario {
    const baseDatos = this.obtenerDatos();
    
    const correoExiste = baseDatos.registros.some(
      (u: Usuario) => u.correo.toLowerCase() === createUsuarioInput.correo.toLowerCase()
    );
    if (correoExiste) {
      throw new BadRequestException('Este correo ya esta registrado');
    }
    const nuevoUsuario: Usuario = {
      id: baseDatos.secuencia,
      ...createUsuarioInput,
    };
    baseDatos.registros.push(nuevoUsuario);
    baseDatos.secuencia += 1;
    this.guardarDatos(baseDatos);
    return nuevoUsuario;
  }

  /**
   * Recupera la totalidad de usuarios almacenados en el JSON.
   * 
   * @returns {Usuario[]} Un arreglo con todos los usuarios registrados.
   */
  findAll(): Usuario[] {
    const baseDatos = this.obtenerDatos();
    return baseDatos.registros;
  }

  /**
   * Busca un usuario específico a través de su identificador único.
   * 
   * @param {number} id: Identificador único del usuario a buscar.
   * @returns {Usuario} El usuario correspondiente al ID dado.
   * @throws {NotFoundException} Si no se encuentra un usuario con el ID especificado.
   */
  findOne(id: number): Usuario {
    const baseDatos = this.obtenerDatos();
    const usuario = baseDatos.registros.find((u: Usuario) => u.id === id);
    if (!usuario) {
      throw new NotFoundException(`El usuario con el identificador ${id} no existe.`);
    }
    return usuario;
  }

  /**
   * Modifica los datos editables de un usuario ya existente.
   * Protege los datos que no se puedan modificar(`id`) para evitar que sean sobrescritos.
   * 
   * @param {number} id: Identificador único del usuario que se desea modificar.
   * @param {UpdateUsuarioInput} updateUsuarioInput: Datos parciales actualizados del usuario.
   * @returns {Usuario} El objeto del usuario con sus cambios actualizados y guardados.
   * @throws {NotFoundException} Si el usuario a modificar no existe en el JSON.
   */
  update(id: number, updateUsuarioInput: UpdateUsuarioInput): Usuario {
    const baseDatos = this.obtenerDatos();
    const indice = baseDatos.registros.findIndex((u: Usuario) => u.id === id);
    if (indice === -1) {
      throw new NotFoundException(`El usuario con el identificador ${id} no existe.`);
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

  /**
   * Elimina de manera permanente un usuario del JSON.
   * 
   * @param {number} id: Identificador único del usuario que será eliminado.
   * @returns {Usuario} El objeto del usuario que acaba de ser eliminado.
   * @throws {NotFoundException} Si no existe ningún usuario asignado al ID colocado.
   */
  remove(id: number): Usuario {
    const baseDatos = this.obtenerDatos();
    const indice = baseDatos.registros.findIndex((u: Usuario) => u.id === id);
    if (indice === -1) {
      throw new NotFoundException(`El usuario con el identificador ${id} no existe.`);
    }
    const usuarioEliminado = baseDatos.registros[indice];
    baseDatos.registros.splice(indice, 1);
    this.guardarDatos(baseDatos);
    return usuarioEliminado;
  }
}