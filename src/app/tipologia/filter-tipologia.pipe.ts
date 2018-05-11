import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTipologia'
})
export class FilterTipologiaPipe implements PipeTransform {
  valida: boolean;
  transform(tipologias: any, codTip: any, nome: any): any {
    if (!codTip && !nome) {
      return tipologias;
    }
    return tipologias.filter(tipologia => {
      this.valida = true;
      if (codTip && !tipologia.cod_tipologia.toString().includes(codTip.toLowerCase())) {this.valida = false; }
      if (nome && !tipologia.nome.toLowerCase().includes(nome.toLowerCase())) {this.valida = false; }
      return this.valida;
      });
    }
}

