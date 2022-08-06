import React from "react";
import ImageBox from "components/ImageBox/ImageBox";

export default function LibraryPage() {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div>
            <div className="flex mt-64">
                {array.map(() => {
                    return <ImageBox />;
                })}
            </div>
        </div>
    );
}
