import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderedItemsData } from "../app/constants";
interface OrderItems {
  items: OrderedItemsData[];
}
const initialState: OrderItems = {
  items: [],
};

const orderedItemsSliceState = createSlice({
  name: "orderItems",
  initialState,
  reducers: {
    addOrderItems: (state, action: PayloadAction<OrderedItemsData[]>) => {
      state.items = [];
      state.items.push(...action.payload);
    },
  },
});

export const { addOrderItems } = orderedItemsSliceState.actions;
export default orderedItemsSliceState.reducer;
