import { atom } from 'recoil';
import { Product} from './types'

export const jackets = atom<Product[]>({
  key: 'jackets', 
  default: [], 
});

export const shirts = atom<Product[]>({
    key: 'shirts', 
    default: [], 
  });

export const accessories = atom<Product[]>({
  key: 'accessories', 
  default: [], 
});

