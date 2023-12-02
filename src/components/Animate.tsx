"use client";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface AnimateProps {
    children: React.ReactNode;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
    isList?: boolean;
}

const Animate = ({ children, className, isList }: AnimateProps) => {
    const [animatedParent] = useAutoAnimate();

    if (isList) {
        return (
            <ul ref={animatedParent} className={className}>
                {children}
            </ul>
        );
    }

    return (
        <div ref={animatedParent} className={className}>
            {children}
        </div>
    );
};

export default Animate;
