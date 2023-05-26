import React from "react";
import { Route, Routes } from "react-router-dom";

import PageMain from "../pages/PageMain";
import PageAuth from "../pages/PageAuth";

export const PagesRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<PageMain />} />
      <Route path="/auth" element={<PageAuth />} />
    </Routes>
  );
};
