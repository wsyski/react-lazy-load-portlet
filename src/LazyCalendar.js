import React from "react";
import LiferayUtil from "./LiferayUtil";

const LazyCalendar = React.lazy(() => LiferayUtil.isPortal() ? import("./Calendar") : import("./Calendar"));

export default LazyCalendar;
