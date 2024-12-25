import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddTutorial from "../pages/AddTutorial";
import MyTutorials from "../pages/MyTutorials";
import FindTutorials from "../pages/FindTutorials";
import MyBookedTutors from "../pages/MyBookedTutors";
import ViewDetails from "../components/ViewDetails";
import PrivateRoute from "./PrivateRoute";





export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorPage/>,

      children:[
        {
            path:"/",
            element:<Home/>,
            // loader: ()=>fetch("http://localhost:5173/products"),
         
        },
       {
        path:"/add-tutorial",
        element:<PrivateRoute><AddTutorial/></PrivateRoute>
       },
       {
        path:"/my-tutorials",
        element: <PrivateRoute><MyTutorials/></PrivateRoute>
       },
       {
        path:"/find-tutorials",
        element:<FindTutorials/>,
       },
       {
         path:"/tutor/:id",
         element:<PrivateRoute><ViewDetails/></PrivateRoute>,
        
       },
      
       {
         path:"/my-booked-tutors",
         element:<PrivateRoute><MyBookedTutors/></PrivateRoute>,
    
       },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        },
       
      ],
    },
  ]);