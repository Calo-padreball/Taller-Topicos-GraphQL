import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosResolver } from './usuarios.resolver';
import { UsuarioService } from './usuarios.service';
import { describe, it, expect, beforeEach } from '@jest/globals'; 

describe('UsuarioResolver', () => {
  let resolver: UsuariosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosResolver,
        { provide: UsuarioService, useValue: {}, },
      ],
    }).compile();

    resolver = module.get<UsuariosResolver>(UsuariosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});