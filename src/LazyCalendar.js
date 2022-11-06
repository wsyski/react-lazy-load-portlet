import React from "react";

const LazyCalendar = React.lazy(() => import("./Calendar"));

export default LazyCalendar;
