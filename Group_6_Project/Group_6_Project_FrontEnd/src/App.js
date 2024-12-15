import React from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeDirectory from "./components/EmployeeDirectory";
import EmployeeCreate from "./components/EmployeeCreate";
import Body from "./components/Body";
import Homepage from "./components/Homepage";
import EmployeeDetails from "./components/EmployeeDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeUpdate from "./components/EmployeeUpdate";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Homepage />, 
      },
      {
        path: "/employee-directory",
        element: <EmployeeDirectory />,
      },
      {
        path: "/employee-create",
        element: <EmployeeCreate />, 
      },
      {
        path: "/employee/:employeeId", 
        element: <EmployeeDetails />, 
      },
      {
        path: "/employee/update/:employeeId", 
        element: <EmployeeUpdate />, 

      },
    ],
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
