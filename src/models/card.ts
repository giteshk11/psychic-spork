import { ICard } from 'src/types';
import { CardState } from './constats';

export default class Card {
  cardId: number;
  cardHolderName: string;
  expirationDate: string;
  cardNumber: string;
  cardState?: CardState;

  constructor(card: ICard) {
    this.cardId = card.cardId ? card.cardId : Math.floor(Math.random() * 100);
    this.cardHolderName = card.cardHolderName;
    this.expirationDate = card.expirationDate;
    this.cardNumber = card.cardNumber;
    this.cardState = CardState.ACTIVE;
  }
}
