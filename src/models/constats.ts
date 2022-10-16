export const menuList = [
  {
    icon: 'Logo',
    label: 'Home',
  },
  {
    icon: 'Pay',
    label: 'Cards',
  },
  {
    icon: 'Payments',
    label: 'Payments',
  },
  {
    icon: 'Credit',
    label: 'Credit',
  },
  {
    icon: 'Account',
    label: 'Profile',
  },
];

export const tabs = [
  {
    name: 'my-debit-cards',
    label: 'My debit cards',
  },
  {
    name: 'all-company-cards',
    label: 'All company cards',
  },
];

export const recentTransaction = [
  {
    icon: 'file-storage',
    date: '20 May 2020',
    type: 'credit',
    name: 'Hamleys',
    amount: '150',
  },
  {
    icon: 'flights',
    date: '20 May 2020',
    type: 'debit',
    name: 'Hamleys',
    amount: '150',
  },
  {
    icon: 'megaphone',
    date: '20 May 2020',
    type: 'debit',
    name: 'Hamleys',
    amount: '150',
  },
  {
    icon: 'file-storage',
    date: '20 May 2020',
    type: 'debit',
    name: 'Hamleys',
    amount: '150',
  },
];

export enum CardState {
  ACTIVE = 'ACTIVE',
  FREEZED = 'FREEZED',
  DELETED = 'DELETED',
}
