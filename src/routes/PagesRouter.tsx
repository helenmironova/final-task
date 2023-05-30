import React from "react";
import { Route, Routes } from "react-router-dom";

import PageMain from "../pages/PageMain";
import PageAuth from "../pages/PageAuth";
import PageSearch from "../pages/PageSearch";

export const PagesRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<PageMain />} />
      <Route path="/auth" element={<PageAuth />} />
      <Route path="/search" element={<PageSearch />} />
    </Routes>
  );
};
