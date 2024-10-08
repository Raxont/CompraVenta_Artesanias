import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Tiendas, tiendasLoader } from "./views/tiendas";
import { Categorias, categoriasLoader } from "./views/categorias";
import { Producto, productoLoader } from "./views/producto";
import { TalleresEducativos, tallerEducativoLoader } from "./views/talleresEducativos";
import { InformacionTaller, informacionTallerLoader } from "./views/informacionTaller";
import { HistoriaTaller, HistoriaTallerLoader } from "./views/historiaTaller";
import { Tienda, tiendaLoader } from "./views/tienda";
import { Favoritos, favoritosLoader } from "./views/favoritos";
import { Descuentos, descuentosLoader } from "./views/descuentos";
import { Register } from "./views/register/Register";
import { Emailform } from "./views/register/Email";
import { Home, homeLoader } from "./views/Home";
import { Cart, cartLoader } from "./views/Cart";
import CheckPay from "./views/CheckPay";
import Cupon from "./views/Cupon";
import Settings from "./views/Settings";
import Comments from "./views/Comments";
import PreguntasFrecuentes from "./views/Questions";
import { Inicio } from "./views/register/Inicio";
import { Phoneform } from "./views/register/Phone";
import { Login } from "./views/register/Login";
import { LogAccount } from "./views/register/LogAccount";
import { Checks } from "./views/register/Checks";
import { User } from "./views/account/user";
import {Chat} from "./views/chat/message"

import  Compras from "./views/Compras";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Inicio/>,
  },
  {
      path: "/tiendas",
      element: <Tiendas/>,
      loader: tiendasLoader
  },
  {
      path: "/tienda/:id",
      element: <Tienda/>,
      loader: tiendaLoader
  },
  {
      path: "/categorias/:categoria",
      element: <Categorias/>,
      loader: categoriasLoader
  },
  {
      path: "/producto/:productId/:userId",
      element: <Producto/>,
      loader: productoLoader,
  },
  {
      path: "/favoritos/:categoria",
      element: <Favoritos/>,
      loader: favoritosLoader
  },
  {
      path: "/descuentos/:categoria",
      element: <Descuentos/>,
      loader: descuentosLoader
  },
  {
      path: "/talleresEducativos",
      element: <TalleresEducativos/>,
      loader: tallerEducativoLoader
  },
  {
      path: "/informacionTaller/:id",
      element: <InformacionTaller/>,
      loader: informacionTallerLoader
  },
  {
    path: "/home",
    element: <Home/>,
    loader: homeLoader
  },
  {
    path: "/confirm",
    element: <CheckPay/>,
  },
  {
    path: "/cupon",
    element: <Cupon/>,
  },
  {
    path: "/settings",
    element: <Settings/>,
  },
  {
    path: "/comments",
    element: <Comments/>,
  },
  {
    path: "/pqr",
    element: <PreguntasFrecuentes/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
      path: "/emailform",
      element: <Emailform/>,
  },
  {
    path: "/phoneform",
    element: <Phoneform/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/logaccount",
    element: <LogAccount/>,
  },
  {
    path: "/checks",
    element: <Checks/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
    loader: cartLoader
  },
  {
    path: "/historiaTaller/:id",
    element: <HistoriaTaller/>,
    loader: HistoriaTallerLoader
  },
  {
    path: "/useraccount",
    element: <User/>,
  },
  {
    path: "/chat/:receptorId",
    element: <Chat/>,
  },
  {
    path: "/compras",
    element: <Compras/>,
  },
])


export function App() {
  
  return (
    <RouterProvider router={routes}/>
  );
}