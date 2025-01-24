/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React from "react";

const LazyMyComponent = React.lazy(() => import("./MyComponent"));

const BooksPage = () => {
  return (
   
        <LazyMyComponent />
     
  );
};
export default BooksPage;
