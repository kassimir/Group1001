import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableHeader'
})
export class TableHeaderPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    // Replace underscores with spaces and process each word
    return value.split('_').map(word => this.processWord(word)).join(' ');
  }

  private processWord(word: string): string {
    // If the word is fully capitalized, keep it capitalized
    if (word === word.toUpperCase()) {
      return word;
    }
    return this.capitalize(word);
  }

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
