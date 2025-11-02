import { SubscriptionTypes } from '../types/types';

interface SubscriptionLike {
  date: Date;
  type: SubscriptionTypes;
}

export const isSubscriptionActive = (subscription: SubscriptionLike): boolean => {
  const today = new Date();
  const start = new Date(subscription.date);
  let end = new Date(start);

  switch (subscription.type) {
    case 'month':
      end.setMonth(end.getMonth() + 1);
      break;
    case 'quarterly':
      end.setMonth(end.getMonth() + 3);
      break;
    case 'single':
      end.setDate(end.getDate() + 1); 
      break;
  }

  return today <= end;
};

export const getSubscriptionExp = (subscription: SubscriptionLike): Date => {
  const start = new Date(subscription.date);
  const end = new Date(start);

  end.setDate(15);
  
  switch (subscription.type) {
    case 'month':
      end.setMonth(end.getMonth() + 1);
      break;
    case 'quarterly':
      end.setMonth(end.getMonth() + 3);
      break;
  }

  return end;
};