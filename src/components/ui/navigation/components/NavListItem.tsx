import Link from "next/link";
import { FC } from "react";

import Tooltip from "@/components/ui/tooltip/Tooltip";

interface NavListItemProps {
  tooltipText: string;
  href: string;
  text: string;
}

const NavListItem: FC<NavListItemProps> = ({ href, text, tooltipText }) => {
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

export default NavListItem;
