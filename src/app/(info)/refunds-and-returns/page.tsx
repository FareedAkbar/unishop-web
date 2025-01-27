import React from "react";

const LazyMyComponent = React.lazy(() => import("./MyComponent"));

const Page = () => {
  return <LazyMyComponent />;
};

export default Page;

