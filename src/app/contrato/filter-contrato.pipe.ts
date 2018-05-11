import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContrato'
})
export class FilterContratoPipe implements PipeTransform {
  valida: boolean;
  transform(contratos: any, empresa: any, numCont: any, pontos: any, procSei: any): any {
    if (!empresa && !numCont && !pontos && !procSei) {
      return contratos;
    }
    return contratos.filter(contrato => {
      this.valida = true;
      if (empresa && !contrato.empresa.toLowerCase().includes(empresa.toLowerCase())) {this.valida = false; }
      if (numCont && !contrato.num_contrato.toLowerCase().includes(numCont.toLowerCase())) {this.valida = false; }
      if (pontos && !contrato.quant_pontos.toString().includes(pontos.toLowerCase())) {this.valida = false; }
      if (procSei && !contrato.processo_sei.toString().includes(procSei.toLowerCase())) {this.valida = false; }
      return this.valida;
      });
    }
  }
