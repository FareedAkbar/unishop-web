import React, { Suspense } from "react";

import Spinner from '~/components/spinner';
const LazyMyComponent = React.lazy(() => import("./MyComponent"));



const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyMyComponent />
    </Suspense>
  );
};

export default Page;
