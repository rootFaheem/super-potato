import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <div>Page Not Found</div>
      <Link to="/">Go back on home page</Link>
    </div>
  );
}
