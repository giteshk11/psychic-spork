import { CardState } from './models/constats';

export interface MenuItem {
  icon: string;
  label: string;
}

export interface ICard extends Record<string, any> {
  cardId?: number;
  cardHolderName: string;
  expirationDate: string;
  cardNumber: string;
  cvv?: string;
  cardState?: CardState;
}
