// Importer la classe Injectable du package @nestjs/common
import { Injectable } from '@nestjs/common';

//Le écorateur @Injectable() marque cette classe comme un service injectable
@Injectable()
export class AppService {
  // Méthode getHello() qui retourne une simple chaîne de caractères
  getHello(): string {
    //Retourne un message de bienvenue
    return 'Hello World!';
  }
}
