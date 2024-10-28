"use client";
import { FaExclamationTriangle } from "react-icons/fa";

const Error = ({ statusCode }: { statusCode: number }) => (
  <div className="flex h-screen flex-col items-center justify-center text-red-500">
    <FaExclamationTriangle className="mb-4 animate-pulse text-6xl" />
    <h1 className="mb-2 text-4xl font-extrabold">
      {statusCode ? `Error ${statusCode}` : "An Error Occurred"}
    </h1>
  </div>
);

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
