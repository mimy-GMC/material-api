import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('app')
@Controller() //Définir le contrôleur principal de l'application
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Route GET par défaut pour obtenir un message de bienvenue
  @Get()
  @ApiOperation({ summary: 'Retourne un message de bienvenue' })
  getHello(): string {
    return this.appService.getHello();
  }

  //Route pour vérifier l'état de l'API
  @Get('ping')
  @ApiOperation({ summary: 'Vérifie l\'état de l\'API' })
  ping() {
    return { message: 'le pong est fonctionnel' }; //Retourne une réponse simple
  }
}
