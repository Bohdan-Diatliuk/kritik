import { bakery } from './products/bakery';
import { dessert } from './products/dessert';
import { drinks } from './products/drinks';
import { fish } from './products/fish';
import { fruits } from './products/fruits';
import { mainDish } from './products/mainDish';
import { meat } from './products/meat';
import { readyMeals } from './products/readyMeals';
import { vegetables } from './products/vegetables';

export const products = [
  ...meat,
  ...fish,
  ...vegetables,
  ...fruits,
  ...bakery,
  ...drinks,
  ...dessert,
  ...readyMeals,
  ...mainDish,
];
