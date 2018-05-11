import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPontoPresenca'
})
export class FilterPontoPresencaPipe implements PipeTransform {
  valida: boolean;
  transform(pontosPres: any, gesac: any, uf: any, municipio: any, status: any, ponto: any, tipologia: any): any {
    if (!gesac && !uf && !municipio && !status && !ponto && !tipologia) {
      return pontosPres;
    }
    return pontosPres.filter(pontoPres => {
      this.valida = true;
      if (gesac && !pontoPres.cod_gesac.toString().includes(gesac.toLowerCase())) {this.valida = false; }
      if (uf && !pontoPres.uf.toLowerCase().includes(uf.toLowerCase())) {this.valida = false; }
      if (municipio && !pontoPres.nome_municipio.toLowerCase().includes(municipio.toLowerCase())) {this.valida = false; }
      if (status && !pontoPres.descricao.toLowerCase().includes(status.toLowerCase())) {this.valida = false; }
      if (ponto && !pontoPres.nome.toLowerCase().includes(ponto.toLowerCase())) {this.valida = false; }
      if (tipologia && !pontoPres.tipologia.toLowerCase().includes(tipologia.toLowerCase())) {this.valida = false; }
      return this.valida;
      });
    }
}
