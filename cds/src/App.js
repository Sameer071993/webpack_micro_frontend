import React, { Suspense } from "react";

const Header = React.lazy(() => import("header/Header"));
const Dashboard = React.lazy(() => import("dashboard/Dashboard"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1>CDS Shell App</h1>
      <Header />
      <Dashboard />
    </Suspense>
  );
}
