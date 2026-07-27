/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import {  useSelector } from "react-redux"; // omborga buyruq jo'natish va o'qish uchun hook'lar
import { createSelector } from "reselect"; // memoize qiluvchi selektor yasovchi funksiya
import { retrieveNewDishes } from "./selector"; // mashhur taomlarni ombordan o'quvchi selektor
import { Product } from "../../../lib/types/product"; // Product tipini olib kelyapti
import { serverApi } from "../../../lib/config";
import { ProductCollection, ProductSize } from "../../../lib/enums/product.enum";


/** REDUX SLICE & SELECTOR **/

const newDishesRetriever = createSelector( // mashhur taomlarni olib beruvchi tayyor selektor
  retrieveNewDishes, // asosiy selektordan
  (newDishes) => ({ newDishes }), // natijani object shaklida qaytaradi
);


export default function NewDishes() {

  const {newDishes} = useSelector(newDishesRetriever);

    console.log("newDishes:", newDishes )

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Fresh Menu</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`
                const sizeVolume = product.productCollection === ProductCollection.DRINK 
                ? product.productVolume + "l" 
                : product.productSize + "size";
                  return (
                    <Card key={product._id} variant="outlined" className={"card"}>
                      <CardOverflow>
                        <div className="product-sale"> {sizeVolume} </div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography className={"title"}>
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className={"price"}>${product.productPrice}</Typography>
                          </Stack>
                          <Stack>
                            <Typography className={"views"}>
                              {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
