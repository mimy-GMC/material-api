// Importer la classe Injectable du package @nestjs/common
import { Injectable } from '@nestjs/common';

//Le écorateur @Injectable() marque cette classe comme un service injectable
@Injectable()
export class AppService {
  // Méthode getHello() qui retourne une simple chaîne de caractères
  getHello(): string {
    //Retourne un message de bienvenue
    return 'Bonjour, j\'espere que ce nouvel an vous apporte de la joie!';
  }
}
