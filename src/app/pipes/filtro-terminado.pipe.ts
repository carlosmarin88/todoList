import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroTerminado',
  pure: false
})
export class FiltroTerminadoPipe implements PipeTransform {

  transform(listas: Lista[], completado: boolean = true): Lista[] {
   return listas.filter(listaData => listaData.completada === completado);
  }

}
