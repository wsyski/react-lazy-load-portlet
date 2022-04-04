import React from "react";

const LazyCalendar = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 5 * 1000)).then(
        () => import("./Calendar")
    );
});

export default LazyCalendar;
