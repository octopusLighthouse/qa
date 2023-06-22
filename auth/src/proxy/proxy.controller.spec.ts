import { Test, TestingModule } from '@nestjs/testing';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';

describe('ProxyController', () => {
  let controller: ProxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProxyController],
      providers: [ProxyService],
    }).compile();

    controller = module.get<ProxyController>(ProxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
