import { Type } from '@angular/core';

export class Card {
  constructor(public component: Type<any>, public x: number, public y: number) {}
}