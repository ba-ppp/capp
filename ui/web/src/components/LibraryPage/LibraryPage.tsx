import React from "react";
import ImageBox from "components/ImageBox/ImageBox";

export default function LibraryPage() {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className="grid grid-cols-4 lg:gap-16 gap-4 mt-64 mx-4 min-w-[768px]">
            {array.map(() => {
                return <ImageBox />;
            })}
        </div>
    );
}
