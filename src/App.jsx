import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";
import { Container, Section } from "./components";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import CatalogPage from "./components/pages/CatalogPage/CatalogPage";
import CatalogDetails from "./components/pages/CatalogDetails/CatalogDetails";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CatalogDetails />} />
      </Routes>
    </>

  );
};

export default App;
