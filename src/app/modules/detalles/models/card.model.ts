import { Type } from '@angular/core';

export interface CardModel {
  title: string;
  component: Type<any>;
  x: number;
  y: number;
}