import { Test, TestingModule } from '@nestjs/testing';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('TasksResolver', () => {
  let resolver: TasksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksResolver,
        { provide: TasksService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<TasksResolver>(TasksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});