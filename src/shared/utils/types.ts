import { KqsElementalTypes } from "@prisma/client";

export function isElement(element: string): element is KqsElementalTypes {
  return Boolean(KqsElementalTypes[element as KqsElementalTypes]);
}
