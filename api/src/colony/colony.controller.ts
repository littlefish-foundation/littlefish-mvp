import { Controller } from '@nestjs/common';
import { ColonyService } from './colony.service';

@Controller('colony')
export class ColonyController {
  constructor(private readonly colonyService: ColonyService) {}
}
