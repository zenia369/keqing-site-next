import Link from "next/link";
import { FC } from "react";

import Tooltip from "@/components/ui/tooltip/Tooltip";

interface appNavListItemProps {
  tooltipText: string;
  href: string;
  text: string;
}

const appNavListItem: FC<appNavListItemProps> = ({
  href,
  text,
  tooltipText,
}) => {
  return (
    <li>
      <Tooltip text={tooltipText}>
        <Link href={href} className="kq-text-600 kq-text-shadow text-xl">
          {text}
        </Link>
      </Tooltip>
    </li>
  );
};

export default appNavListItem;
