import React from "react";
import LiferayUtil from "./LiferayUtil";

const LazyCalendar = LiferayUtil.isPortal()
    ? new Promise((resolve, reject) => Liferay.Loader.require(["react-lazy-load-portlet@1.0.0/Calendar"],
        (Module) => {
            console.log('Module', Module);
            resolve(new Module())
        },
        (error) => reject(error)))
    : React.lazy(() => import("./Calendar"));

export default LazyCalendar;
