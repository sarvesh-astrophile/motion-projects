"use client";

import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
  animate,
} from "framer-motion";

const SLIDER_HEIGHT = 224;
const ICON_SIZE = 40;
const DRAG_AREA_HEIGHT = SLIDER_HEIGHT - ICON_SIZE;

const IosBrightness = () => {
  const y = useMotionValue(0);

  const fillHeight = useTransform(
    y,
    [-DRAG_AREA_HEIGHT, 0, ICON_SIZE],
    [`${SLIDER_HEIGHT}px`, `${ICON_SIZE}px`, "0px"]
  );

  const yOnPanStart = React.useRef(0);

  const handlePanStart = () => {
    yOnPanStart.current = y.get();
  };

  const handlePan = (e: MouseEvent | TouchEvent, info: PanInfo) => {
    let newY = yOnPanStart.current + info.offset.y;
    const newYClamped = Math.max(-DRAG_AREA_HEIGHT, Math.min(newY, ICON_SIZE));
    y.set(newYClamped);
  };

  const handlePanEnd = (e: MouseEvent | TouchEvent, info: PanInfo) => {
    const newY = yOnPanStart.current + info.offset.y;
    const newYClamped = Math.max(-DRAG_AREA_HEIGHT, Math.min(newY, ICON_SIZE));

    if (Math.abs(info.velocity.y) > 200) {
      animate(y, newYClamped, {
        type: "spring",
        stiffness: 400,
        damping: 40,
        velocity: info.velocity.y,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900">
      <motion.div
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ height: SLIDER_HEIGHT }}
        className="relative flex justify-center w-20 overflow-hidden rounded-4xl bg-neutral-800 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="absolute bottom-0 w-full bg-white rounded-none"
          style={{ height: fillHeight }}
        />
        <SunIcon className="absolute bottom-2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8" />
      </motion.div>
    </div>
  );
};

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
  >
    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
  </svg>
);

export default IosBrightness;
