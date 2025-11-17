import { Category } from '@models/index';

const generateMessage = (entity: string) => ({
  notFound: `${entity} not found`,
  alreadyExist: `${entity} already exist`,
  created: `${entity} created`,
  updated: `${entity} updated`,
  deleted: `${entity} deleted`,
  failToCreate: `${entity} failed to create`,
  failToUpdate: `${entity} failed to update`,
  failToDelete: `${entity} failed to delete`,
});

export const message = {
  Category: { ...generateMessage('Category') },
  Brand: { ...generateMessage('Brand') },
  Product: { ...generateMessage('Product') },
  Coupon: { ...generateMessage('Coupon') },
};
