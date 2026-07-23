import { createSlice } from "@reduxjs/toolkit"; // slice yasovchi funksiyani olib kelyapti
import { HomePageState } from "../../../lib/types/screen"; // ombor uchun tip (shakl)ni olib kelyapti

const initialState: HomePageState = { // ombordagi boshlang'ich holat
    popularDishes: [], // mashhur taomlar - hozircha bo'sh
    newDishes: [], // yangi taomlar - hozircha bo'sh
    topUsers: [], // top userlar - hozircha bo'sh
};
const homePageSlice = createSlice({ // "homePage" nomli slice yasayapti
    name: "homePage", // slice nomi
    initialState, // boshlang'ich holatni beryapti
    reducers: { // holatni o'zgartiruvchi funksiyalar
        setPopularDishes: (state, action) => { // mashhur taomlarni yozuvchi reducer
            state.popularDishes = action.payload; // kelgan ma'lumotni omborga yozadi
        },
        setNewDishes: (state, action) => { // yangi taomlarni yozuvchi reducer
            state.newDishes = action.payload; // kelgan ma'lumotni omborga yozadi
        },
        setTopUsers: (state, action) => { // top userlarni yozuvchi reducer
            state.topUsers = action.payload; // kelgan ma'lumotni omborga yozadi
        },
    },
});

export const { setPopularDishes, setNewDishes, setTopUsers } = // uchala action'ni chiqarib olyapti
    homePageSlice.actions; // slice ichidagi actions'dan

const HomePageReducer = homePageSlice.reducer; // reducerning o'zini o'zgaruvchiga oladi
export default HomePageReducer; // asosiy store uchun export qiladi