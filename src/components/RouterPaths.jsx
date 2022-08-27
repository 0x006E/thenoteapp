import React from "react";
import { Route, Routes } from "react-router-dom";
import Error404 from "./Error404";
import Topics from "./Topics";
import TopicsContent from "./Topics/TopicsContent";

function RouterPaths() {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<Topics initial />} />
      <Route path="/:subject" element={<Topics />}>
        <Route path="/:subject/:topic" element={<TopicsContent />} />
      </Route>
    </Routes>
  );
}

export default RouterPaths;
