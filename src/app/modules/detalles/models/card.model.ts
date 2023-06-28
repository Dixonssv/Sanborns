import { Type } from '@angular/core';

export interface CardModel {
  index?: number;
  title: string;
  component: Type<any>;
  w?: number;
  h?: number;
  x?: number;
  y?: number;
}