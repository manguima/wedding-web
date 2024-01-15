import { useScrollIntoView } from "@mantine/hooks";
import { RefObject } from "react";
export class MenuToView {
  constructor() {
    const { targetRef, scrollIntoView } = useScrollIntoView<HTMLDivElement>({
      offset: 60,
    });

    this.targetRef = targetRef;
    this.scrollIntoView = scrollIntoView;
  }
  public targetRef: RefObject<HTMLDivElement>;
  public scrollIntoView: ({ alignment }?: any | undefined) => void;
}
