import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterInstResp'
})
export class FilterInstRespPipe implements PipeTransform {
  valida: boolean;
  transform(instResps: any, cnpj: any, nome: any, sigla: any): any {
    if (!cnpj && !nome && !sigla) {
      return instResps;
    }
    return instResps.filter(resp => {
      this.valida = true;
      if ((cnpj && resp.cnpj_instituicao == null) ||
          (cnpj && !resp.cnpj_instituicao.toLowerCase().includes(cnpj.toLowerCase()))) {this.valida = false; }
      if (nome && !resp.nome.toLowerCase().includes(nome.toLowerCase())) {this.valida = false; }
      if (sigla && !resp.sigla.toLowerCase().includes(sigla.toLowerCase())) {this.valida = false; }
      return this.valida;
      });
    }

}
