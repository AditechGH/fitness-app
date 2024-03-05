import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workout',
  standalone: true,
})
export class WorkoutPipe implements PipeTransform {
  transform(value: any): unknown {
    if (value.type === 'endurance') {
      return `Distance: ${value.endurance.distance + 'km'}, Duration: ${
        value.endurance.distance + 'mins'
      }`;
    } else {
      return `Weight: ${value.strength.weight + 'kg'}, Reps: ${
        value.strength.reps
      }, Sets: ${value.strength.sets}`;
    }
    return null;
  }
}
