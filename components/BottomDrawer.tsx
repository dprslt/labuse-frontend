import React, {
    ReactNode,
    UIEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useSwipeable } from 'react-swipeable';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

import { mergeClasses } from '@dprslt/react';

type BottomDrawerProps = {
    children: ReactNode;
    className?: string;
    title: ReactNode;
};

const BottomDrawer: React.FC<BottomDrawerProps> = ({
    children,
    className,
    title,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    // We use this to take the control on position of the drawer locally and record for touch/drag event
    const [isDown, setIsDown] = useState(false);
    // We use this marker to remove the css transition while moving the panel
    const [isMoving, setIsMoving] = useState(false);

    const [isScrolledTop, setIsScrolledTop] = useState(true);
    const [topDistance, setTopDistance] = useState<number | undefined>(
        undefined
    );

    const swipeHandlers = useSwipeable({
        onSwipedDown: (eventData) => {
            // To prevent closing while scrolling to the top
            if (isScrolledTop) {
                setIsOpen(false);
            }
        },
    });

    const movingHandler = (evt: TouchEvent) => {
        setIsMoving(true);
        const perc = (evt.touches[0].clientY - 30) / window.innerHeight;
        setTopDistance(perc * 100);
    };

    const scrollHandler: UIEventHandler<HTMLDivElement> = (evt) => {
        setIsScrolledTop((evt.target as HTMLDivElement).scrollTop === 0);
    };

    useEffect(() => {
        if (isDown) {
            document.addEventListener('touchmove', movingHandler);
        }
        return () => {
            document.removeEventListener('touchmove', movingHandler);
        };
    }, [isDown]);

    return (
        <div
            className={mergeClasses(
                'bottom-drawer',
                className,
                isOpen ? 'open' : '',
                isMoving ? 'moving' : ''
            )}
            style={{ top: isDown ? `${topDistance}%` : undefined }}
        >
            <div
                className="header"
                onClick={() => {
                    setIsDown(false);
                    setIsMoving(false);
                    setIsOpen(!isOpen);
                }}
                onTouchStart={() => setIsDown(true)}
                onTouchEnd={() => {
                    if (isOpen) {
                        if (topDistance && topDistance > 10) {
                            setIsOpen(false);
                        }
                    } else {
                        if (topDistance && topDistance < 90) {
                            setIsOpen(true);
                        }
                    }
                    setIsDown(false);
                    setIsMoving(false);
                    setTopDistance(undefined);
                }}
            >
                <h2>{title}</h2>
                {isOpen ? <CloseIcon /> : <KeyboardDoubleArrowUpIcon />}
            </div>
            <div
                className="content"
                onScroll={scrollHandler}
                {...swipeHandlers}
            >
                {children}
            </div>
        </div>
    );
};

export default BottomDrawer;
