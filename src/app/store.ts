import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//import HomePageReducer from "./screens/homePage/slice";
//import ProductsPageReducer from "./screens/productsPage/slice";
//import OrdersPageReducer from "./screens/ordersPage/slice";
import reduxLogger from "redux-logger";
import HomePageReducer from "./screens/homePage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    dummy: (state = {}) => state,
    homePage: HomePageReducer,
    //productsPage: ProductsPageReducer,
    //ordersPage: OrdersPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
