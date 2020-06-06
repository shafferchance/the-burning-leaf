import React, { useState, useRef } from 'react';

import { RightSideBar } from './RightSideBar.component';

const Page = ({ components, className }) => {
    const [idx, setIdx] = useState(0);
    const scrolling = useRef(false);

    const handleScroll = e => {
        e.stopPropagation();
        if (!scrolling.current) {
            scrolling.current = true;
            if (e.deltaY > 0) {
                setIdx(old => old + 1 > components.length - 1 ? 0 : old + 1);
            } else {
                setIdx(old => old - 1 < 0 ? components.length - 1 : old - 1);
            }
            setTimeout(() => {
                scrolling.current = false;
            }, 500);
        }
    }

    const activeComp = components.filter((val, innerIdx) => idx === innerIdx);

    return (
        <>
            <div onWheel={handleScroll} className={"full-container horizontal-flex-alignment"}>
                {activeComp[0]}
            </div>
        </>
    )
}

export default Page;