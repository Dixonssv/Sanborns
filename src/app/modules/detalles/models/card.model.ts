import { Type } from '@angular/core';

export interface CardModel {
  index?: number;
  title: string;
  component: Type<any>;
  x: number;
  y: number;
}