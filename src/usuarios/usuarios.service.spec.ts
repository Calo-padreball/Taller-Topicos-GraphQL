import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuarios.service'; 
import { describe, it, expect, beforeEach } from '@jest/globals'; 

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('Deberia estar definido', () => {
    expect(service).toBeDefined();
  });
});