import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { describe, it, expect, beforeEach } from '@jest/globals'; 

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('Deberia estar definido', () => {
    expect(service).toBeDefined(); 
  });
});