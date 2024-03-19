// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'duration'
// })
// export class DurationPipe implements PipeTransform {

//   transform(durationInMinutes: number): string {
//     const hours = Math.floor(durationInMinutes / 60);
//     const minutes = durationInMinutes % 60;
//     return `${hours} שעות ו ${minutes} דקות`;
//   }
// }
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    return Math.floor(value/60)>0?`${Math.floor(value/60)} שעות, ${value%60} דקות`:`${value%60} `;
  }
}