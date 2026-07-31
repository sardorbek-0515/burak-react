/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating"; // @ts-ignore
import "swiper/css"; // @ts-ignore
import "swiper/css/free-mode"; // @ts-ignore
import "swiper/css/navigation"; // @ts-ignore
import "swiper/css/thumbs"; // @ts-ignore
import { FreeMode, Navigation, Thumbs } from "swiper";
import { createSelector } from "reselect"; // memoize qiluvchi selektor yasovchi funksiya
import { useDispatch, useSelector } from "react-redux"; // omborga buyruq jo'natish va o'qish uchun hook'lar
import { Dispatch } from "@reduxjs/toolkit";
import { setRestaurant, setChosenProduct } from "./slice"; // mashhur taomlarni omborga yozuvchi action
import { Product } from "../../../lib/types/product";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector"; // mashhur taomlarni ombordan o'quvchi selektor
import { useParams } from "react-router";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";
import { CartItem } from "../../../lib//types/search"; // CartItem tipi - loyihangizdagi joyiga qarab manzilni tekshiring

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductsRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const restaurantRetriever = createSelector(retrieveRestaurant, (restaurant) => ({
  restaurant,
}));

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props; // propsni ichidan onAdd ni olib beradi, "destructuring" deyiladi
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductsRetriever); // "s" qo'shildi
  const { restaurant } = useSelector(restaurantRetriever);

  // console.log("productId:", productId);
  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img className="slider-image" src={imagePath} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>
              {chosenProduct?.productName}
            </strong>
            <span className={"resto-name"}>{restaurant?.memberNick}</span>
            <span className={"resto-name"}>{restaurant?.memberPhone}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>
              {chosenProduct?.productDesc
                ? chosenProduct?.productDesc
                : "No Description"}
            </p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button
                variant="contained"
                onClick={(e) => {
                  console.log("BUTTTON PRESSED");
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}