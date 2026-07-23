/* eslint-disable @typescript-eslint/no-unused-vars */ // ishlatilmagan o'zgaruvchi haqida ogohlantirmani o'chirib qo'yadi
import { createSelector } from "reselect"; // memoize qiluvchi selektor yasovchi funksiya
import { AppRootState } from "../../../lib/types/screen"; // butun ilova ombori tipini olib kelyapti
import HomePage from "."; // shu papkadagi HomePage komponentini olib kelyapti (ishlatilmayapti)

const selectHomePage = (state: AppRootState) => state.homePage; // butun ombordan faqat homePage bo'limini oladi
export const retrievePopularDishes = createSelector( // mashhur taomlarni o'qib beruvchi selektor
    selectHomePage, // homePage bo'limidan
    (HomePage) => HomePage.popularDishes, // faqat popularDishes qismini qaytaradi
);
export const retrieveNewDishes = createSelector( // yangi taomlarni o'qib beruvchi selektor
    selectHomePage, // homePage bo'limidan
    (HomePage) => HomePage.newDishes, // faqat newDishes qismini qaytaradi
);
export const retrieveTopUsers = createSelector( // top userlarni o'qib beruvchi selektor
    selectHomePage, // homePage bo'limidan
    (HomePage) => HomePage.topUsers, // faqat topUsers qismini qaytaradi
);