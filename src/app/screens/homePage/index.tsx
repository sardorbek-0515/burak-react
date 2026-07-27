/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */ // ishlatilmagan o'zgaruvchi haqidagi ogohlantirmani o'chiradi
import React, { useEffect } from "react"; // React va useEffect hook'ini olib kelyapti
import ActiveUsers from "./ActiveUsers"; // faol userlar komponentini olib kelyapti
import Advertisement from "./Advertisement"; // reklama komponentini olib kelyapti
import Events from "./Events"; // tadbirlar komponentini olib kelyapti
import NewDishes from "./NewDishes"; // yangi taomlar komponentini olib kelyapti
import PopularDishes from "./PopularDishes"; // mashhur taomlar komponentini olib kelyapti
import Statistics from "./Statistics"; // statistika komponentini olib kelyapti
import "../../../css/home.css"; // bosh sahifa uchun CSS faylini ulaydi

import { useDispatch } from "react-redux"; // omborga buyruq jo'natish va o'qish uchun hook'lar
import { Dispatch } from "@reduxjs/toolkit"; // dispatch funksiyasining tipi
import { setPopularDishes } from "./slice"; // mashhur taomlarni omborga yozuvchi action
import { Product } from "../../../lib/types/product"; // Product tipini olib kelyapti
import ProductService from "../../services/ProductService"
import { ProductCollection } from "../../../lib/enums/product.enum";


/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({ // dispatch'ni o'rab, qisqa chaqiruv yasovchi funksiya
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)), // chaqirilganda action'ni dispatch qiladi
});


export default function HomePage() { // HomePage komponentini yasab, export qiladi
  const { setPopularDishes } = actionDispatch(useDispatch()); // dispatch funksiyasini olib, setPopularDishes'ni ajratadi


  useEffect(() => { // komponent ekranga chiqqanda ishga tushadigan effekt
    // Backend server data request => Date // izoh: bu yerda serverga so'rov yuborilishi kerak
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,

    }).then(data => {
      console.log("data passed here:", data)
      setPopularDishes(data); 
    }).catch((err) => console.log(err));
  
  }, []); // bo'sh massiv - faqat bir marta, komponent ochilganda ishlaydi

  // console.log("popularDishes:", popularDishes )

  return ( // komponent nima chiqarishini belgilaydi
    <div className={"homepage"}> {/* bosh sahifaning tashqi o'rovchi div'i */}
      <Statistics /> {/* statistika bo'limi */}
      <PopularDishes /> {/* mashhur taomlar bo'limi */}
      <NewDishes /> {/* yangi taomlar bo'limi */}
      <Advertisement /> {/* reklama bo'limi */}
      <ActiveUsers /> {/* faol userlar bo'limi */}
      <Events /> {/* tadbirlar bo'limi */}
    </div>
  );
}