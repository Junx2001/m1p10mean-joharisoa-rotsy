import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avancementStatut'
})
export class AvancementPipe implements PipeTransform{
    transform(n:number):string{
        let statut : string;
        if (n==0){
            statut = '<i class="fas fa-circle text-red-500 mr-2"></i>pas encore commencé';
          }else if (n==100){
            statut = '<i class="fas fa-circle text-emerald-500 mr-2"></i>réparé';
          }else{
            statut='<i class="fas fa-circle text-orange-500 mr-2"></i>en cours';
          }
        return statut;
    }
}