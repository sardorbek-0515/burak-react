import { Member } from "./member";
import { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootState {
    homePage: HomePageState;
    // productPage: ProductsPageState;

}

/** HOMEPAGE **/
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/** PRODUCTS PAGE **/

/** ORDERS PAGE **/