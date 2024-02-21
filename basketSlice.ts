import { basketAPI } from '@modules/Basket/api/basket';
import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { LSBroadcastMessage } from 'src/utils/LSevents';
import { TBasketInfo, TBasketItem } from 'typings';

export type TBasketResponse = { items: TBasketItem[] } & TBasketInfo;

type TBasketState = EntityState<TBasketItem> & {
  info: TBasketInfo;
};

const basketAdapter = createEntityAdapter<TBasketItem>({
  selectId: (item: TBasketItem) => item.productBasketId,
});

const initialState: TBasketState = basketAdapter.getInitialState({
  info: {
    price: {
      base: 0,
      discount: 0,
    },
    amount: 0,
    delivery: [],
    payment: [],
    storage: [],
  },
});

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    syncBasket(
      state,
      { payload: { items, ...info } }: PayloadAction<TBasketResponse>,
    ) {
      state.info = info;
      basketAdapter.setAll(state, items);
    },
  },
  extraReducers(builder) {
    type keys = keyof typeof basketAPI.endpoints;
    for (let method in basketAPI.endpoints) {
      if (method in basketAPI.endpoints) {
        builder.addMatcher(
          basketAPI.endpoints[method as keys].matchFulfilled,
          (state, { payload: { items, ...info } }) => {
            state.info = info;
            basketAdapter.setAll(state, items);
            LSBroadcastMessage('basket', { items, ...info });
            LSBroadcastMessage('basketAmount', info.amount);
          },
        );
      }
    }
  },
});

export const BasketActions = basketSlice.actions;

export const {
  selectAll: selectBasketItems,
  selectById: selectBasketItemById,
  selectIds: selectBasketIds,
} = basketAdapter.getSelectors((state: RootState) => state.basket);
export const selectBasketInfo = (state: RootState) => state.basket.info;
