'use client';
import dynamic from 'next/dynamic';

const LazyMyComponent = dynamic(() => import('./MyComponent'), {
  ssr: false,
});

const Page = () => {
  return <LazyMyComponent />;
};

export default Page;