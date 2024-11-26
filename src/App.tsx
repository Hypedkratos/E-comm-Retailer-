/* default imports */
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

/* pages imports */
import Landing from "./pages/Landing";
import Catalog from "./pages/Catalog";
import SingleCatalog from "./pages/SingleCatalog";
import BulkUpload from "./pages/BulkUpload";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/landing-screen" element={<Landing />} />
      <Route path="/catalog-screen" element={<Catalog />} />
      <Route path="/catalog" element={<SingleCatalog />} />
      <Route path="/bulk-upload" element={<BulkUpload />} />
    </Routes>
  );
};

export default App;
