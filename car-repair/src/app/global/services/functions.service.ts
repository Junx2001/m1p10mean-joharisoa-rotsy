import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {


  constructor() { }

    getMonthName(monthNumber, format:"numeric" | "2-digit" | "long" | "short" | "narrow" | undefined) {
        const date = new Date('2023-01-01T03:00:00');
        date.setMonth(monthNumber - 1);
        
        return date.toLocaleString('fr-FR', { month: format });
  }
  
}