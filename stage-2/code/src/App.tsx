import * as React from "react";

//import { BrowserRouter } from 'react-router-dom';
//import { renderRoutes } from 'react-router-config';
import { hot } from "react-hot-loader/root";

//import { AppProvider } from 'store'
//import { routes } from 'config';
import HomePage from "pages/Home/Home.page";

//const App: React.FC = () => {
//return (
//<AppProvider>
//<BrowserRouter>
//{renderRoutes(routes)}
//</BrowserRouter>
//</AppProvider>
//)
//};

const App: React.FC = () => {
  return <HomePage />;
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
