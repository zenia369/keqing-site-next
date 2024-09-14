import { RefObject, useCallback, useEffect, useState } from "react";

type Position = Partial<{
  top: number;
  left: number;
}>;

const defaultBorder = 5;
const verticalOffset = 5;

const useTooltip = (
  tooltipRef: RefObject<HTMLDivElement>,
  tooltipTextRef: RefObject<HTMLParagraphElement>
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>({});

  const onMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!tooltipRef.current || !tooltipTextRef.current) {
      return;
    }

    if (isVisible) {
      const { left, right, width, bottom, top } = tooltipRef.current.getBoundingClientRect();

      const { width: tooltipWidth = 0, height: tooltipHeight = 0 } =
        tooltipTextRef?.current?.getBoundingClientRect();

      const middleTextWidth = tooltipWidth / 2;
      const documentWidth = document.documentElement.clientWidth;
      const documentHeight = document.documentElement.clientHeight;

      const isTooltipParretWidthBigger = tooltipWidth < width;
      const leftBorder = left < middleTextWidth;
      const rightBorder = documentWidth - middleTextWidth < right;
      const topBorder = top < tooltipHeight;
      const bottomBorder = documentHeight - tooltipHeight < bottom;

      let leftPosition = isTooltipParretWidthBigger
        ? left + width / 2 - middleTextWidth
        : left + width - middleTextWidth;
      let topPosition = bottom + verticalOffset;

      if (leftBorder) {
        leftPosition = defaultBorder;
      } else if (rightBorder) {
        const rightWidth = right - documentWidth;
        leftPosition = documentWidth + rightWidth - tooltipWidth + defaultBorder;
      }

      if (topBorder) {
        topPosition = bottom + verticalOffset;
      } else if (bottomBorder) {
        topPosition = top - tooltipHeight - verticalOffset;
      }

      setPosition({
        top: topPosition,
        left: leftPosition,
      });
    }

    if (!isVisible) {
      setPosition({});
    }
  }, [isVisible, tooltipRef, tooltipTextRef]);

  return { isVisible, onMouseEnter, onMouseLeave, position };
};

export default useTooltip;
