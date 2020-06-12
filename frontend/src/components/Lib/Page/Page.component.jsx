import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v1 } from 'uuid';

import './Page.css';

const Page = ({ components, className }) => {
    const [idx, setIdx] = useState(0);
    const [active, setActive] = useState(components[0]);
    const [animating, setAnimating] = useState();
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        if (!scrolling.current) {
            animinate();
        } else if(animating) {
            clearInterval(animating);
            setAnimating(undefined);
        }

        return () => clearInterval(animating);
    }, [scrolling]);

    const handleScroll = e => {
        e.stopPropagation();
        if (!scrolling) {
            setScrolling(true);
            if (e.deltaY > 0) {
                setIdx(old => {
                    let newIdx = old + 1 > components.length - 1 ? 0 : old + 1;
                    setActive(v1());
                    return newIdx;
                });
            } else {
                setIdx(old => {
                    let newIdx = old - 1 < 0 ? components.length - 1 : old - 1;
                    setActive(v1());
                    return newIdx;
                });
            }
            setTimeout(() => {
                setScrolling(false);
            }, 500);
        }
    }

    const animinate = () => {
        if (animating) {
            clearInterval(animating);
            setAnimating(undefined);
        }
        let interval = setInterval(() => {
            setIdx(old => {
                let newIdx = old + 1 > components.length - 1 ? 0 : old + 1;
                setActive(v1());
                return newIdx;
            });
        }, 10000);
        setAnimating(interval);
    }

    const activeComp = components.filter((val, innerIdx) => idx === innerIdx)[0];

    return (
        <div onWheel={handleScroll} className={"full-container horizontal-flex-alignment"}>
            <TransitionGroup>
                <CSSTransition
                    key={active}
                    classNames={"page-content"}
                    timeout={500}
                >
                    <div className={"full-container"}>
                        {activeComp}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}

export default Page;