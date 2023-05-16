import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Root, Home, UserTable, UserChart, NotFound } from "../pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={Root}>
      <Route index Component={Home} />
      <Route path="/table" Component={UserTable} />
      <Route path="/chart" Component={UserChart} />
      <Route path="*" Component={NotFound} />   
    </Route>
  )
);