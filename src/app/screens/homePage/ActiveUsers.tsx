import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import {  useSelector } from "react-redux"; // omborga buyruq jo'natish va o'qish uchun hook'lar
import { createSelector } from "reselect"; // memoize qiluvchi selektor yasovchi funksiya
import { retrieveTopUsers } from "./selector"; // mashhur taomlarni ombordan o'quvchi selektor
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";


/** REDUX SLICE & SELECTOR **/

const topUsersRetriever = createSelector( // mashhur taomlarni olib beruvchi tayyor selektor
  retrieveTopUsers, // asosiy selektordan
  (topUsers) => ({ topUsers }), // natijani object shaklida qaytaradi
);


export default function ActiveUsers() {
  const {topUsers} = useSelector(topUsersRetriever);
  return (
    <div className={"active-users-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Active Users</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`
                  return (
                    <Card 
                    key={member._id} 
                    variant="outlined" 
                    className={"card"}>
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow>
                        <Typography className={"member-nickname"}>
                          {member.memberNick}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
