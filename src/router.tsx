import { createBrowserRouter } from "react-router-dom";
import ListingsPage from "./routes/ListingsPage/ListingsPage";
import AddListingPage from "./routes/AddListingPage/AddListingPage";
import ListingDetailsPage from "./routes/ListingDetailsPage/ListingDetailsPage";
import AppFrame from "./components/AppFrame/AppFrame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppFrame />,
    children: [
      {
        path: "/",
        element: <ListingsPage />,
      },
      {
        path: "/addListing",
        element: <AddListingPage />,
      },
      {
        path: "/listing/:id",
        element: <ListingDetailsPage />,
      },
    ],
  },
]);

export default router;
