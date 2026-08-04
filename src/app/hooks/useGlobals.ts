import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";
import { CartItem } from "../../lib/types/search";

interface BasketInterface {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}

interface GlobalInterface {
    authMember: Member | null;
    setAuthMember: (member: Member | null) => void;
    orderBuilder: Date;
    setOrderBuilder: (input: Date) => void;
    BASKET: BasketInterface;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
    undefined,
);

export const useGlobals = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) throw new Error("useGlobal without Provider");
    return context;
};