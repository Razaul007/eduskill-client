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
        element:<AddTutorial/>
       },
       {
        path:"/my-tutorials",
        element: <MyTutorials/>
       },
       {
        path:"/find-tutorials",
        element:<FindTutorials/>,
       },
       {
         path:"/tutor/:id",
         element:<ViewDetails/>,
        
       },
      
       {
         path:"/my-booked-tutors",
         element:<MyBookedTutors/>,
    
       },
        


        // },
        // {
        //     path:"/add-product",
        //     element:<AddEquipment/>
        // },
        // {
        //     path:"/my-equipment",
        //     element:<PrivateRoute><MyEquipmentList/></PrivateRoute>,
           

        // },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        },
        // {
        //     path:"/update/:id",
        //     element:<UpdateEquipment/>,
        //     loader: ({ params }) => fetch(`http://localhost:4000/products/${params.id}`),
        // }
       
      ],
    },
    // {
    //     path:"/dashboard",
    //     element:(
    //     <PrivateRoute>
    //         <DashboardLayout/>
    //     </PrivateRoute>
    //     ),
    //     children:[
    //         {
    //           path:"/dashboard/overview",
    //           element: <Overview/>
    //        },
    //     //    seller routes
    //         {
    //           path:"/dashboard/my-products",
    //           element: 
    //           (<SellerRoute>
    //             <MyProducts/>
    //           </SellerRoute>)
    //        },
    //         {
    //           path:"/dashboard/overview",
    //           element: 
    //           (<SellerRoute>
    //             <AddProducts/>
    //           </SellerRoute>)
    //        },
    // ],
    // },
  ]);