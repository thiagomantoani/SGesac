import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmpresa'
})
export class FilterEmpresaPipe implements PipeTransform {
  valida: boolean;
  transform(empresas: any, cnpj: any, empresa: any, municipio: any, uf: any): any {
    if (!cnpj && !empresa && !municipio && !uf) {
      return empresas;
    }
    return empresas.filter(emp => {
      this.valida = true;
      if (cnpj && !emp.cnpj_empresa.toLowerCase().includes(cnpj.toLowerCase())) {this.valida = false; }
      if (empresa && !emp.empresa.toLowerCase().includes(empresa.toLowerCase())) {this.valida = false; }
      if (municipio && !emp.nome_municipio.toLowerCase().includes(municipio.toLowerCase())) {this.valida = false; }
      if (uf && !emp.uf.toLowerCase().includes(uf.toLowerCase())) {this.valida = false; }
      return this.valida;
      });
    }
}
