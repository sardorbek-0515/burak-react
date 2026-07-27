import { Member } from "./member"; // Member tipini olib kelyapti
import { Product } from "./product"; // Product tipini olib kelyapti

/** REACT APP STATE **/
export interface AppRootState { // butun ilovaning ombor shakli
    homePage: HomePageState; // homePage bo'limi shu tipda bo'ladi
    productPage: ProductsPageState; // kelajakda qo'shiladigan bo'lim (hozircha o'chirilgan)

}

/** HOMEPAGE **/
export interface HomePageState { // homePage ombori qanday shaklda bo'lishi
    popularDishes: Product[]; // mashhur taomlar - Product massivi
    newDishes: Product[]; // yangi taomlar - Product massivi
    topUsers: Member[]; // top userlar - Member massivi
}

/** PRODUCTS PAGE **/ // kelajakda productlar sahifasi uchun joy
export interface ProductsPageState {
    restaurant: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}
/** ORDERS PAGE **/ // kelajakda buyurtmalar sahifasi uchun joy