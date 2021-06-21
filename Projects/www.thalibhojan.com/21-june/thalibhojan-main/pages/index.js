import React, { useState } from "react";
import Banner from "../components/views/Banner";
import AppValues from "../components/views/AppValues";
// import { useSelector } from "react-redux";
import AppCTA from "../components/views/AppCTA";

import dynamic from "next/dynamic";

const Menus = dynamic(() => import("../components/views/Menus"));

export default function Home() {
  // const mainMenu = useSelector((state) => state.storeItems.mainMenu);

  // const [search, setSearch] = useState("");

  // const onInputChange = (e) => {
  //   const toLowerCase = e.target.value.toLowerCase().trim();
  //   setSearch(toLowerCase);
  //   console.log("In");
  //   if (search.length > 0) {
  //     const newMenu = mainMenu.filter((menu) => {
  //       return Object.values(menu)
  //         .join(" ")
  //         .toLocaleLowerCase()
  //         .includes(search);
  //     });
  //     setMenus(newMenu);
  //   } else {
  //     setMenus(mainMenu);
  //   }
  // };

  return (
    <>
      <Banner />
      <AppValues />
      <Menus />
      <AppCTA />
    </>
  );

  // return auth.uid || guest ? (
  //   <

  //     <Banner />
  //     <AppValues />
  //     <Menus
  //       mainMenu={search.length < 1 ? mainMenu : menus}
  //       search={search}
  //       onInputChange={onInputChange}
  //     />
  //     <AppCTA />
  //   </>
  // // ) : (
  // //   <Register setGuest={setGuest} guest={guest}/>
  // // );
}
