"use client";
import { debounce } from "lodash";

import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface StickyrollContext {
  progress: number;
  totalProgress: number;
  currentSection: number;
  sectionsCount: number;
  totalHeight: number;
  currentSectionHeight: number;
}

const stickyrollInitialProps: StickyrollContext = {
  progress: 0,
  totalProgress: 0,
  currentSection: 0,
  sectionsCount: 0,
  totalHeight: 0,
  currentSectionHeight: 0,
};

const stickyrollContext = createContext<StickyrollContext>(
  stickyrollInitialProps
);

type StickyrollProps = {
  anchor?: "top" | "bottom";
  offset?: number;
  debugMode?: boolean;
  sections: ReactElement<any, any>[];
  children?: React.ReactNode;
};

export const KabukiRoll = ({
  anchor = "bottom",
  offset = 0,
  debugMode = false,
  sections,
  children,
}: StickyrollProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  const [progress, setProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);

  const [sectionsCount, setSectionsCount] = useState(sections.length);

  const [totalHeight, setTotalHeight] = useState(0);
  const [sectionsHeight, setSectionsHeight] = useState<number[]>([]);
  const providerRef = useRef<any>(null);

  // update the sections count when the sections change
  useEffect(() => {
    setSectionsCount(sections.length);
  }, [sections]);

  // get the total height of all elements inside providerRef and sum it to totalHeight
  // update when the sections change or when the window resizes

  useEffect(() => {
    const calculateTotalHeight = () => {
      const children: HTMLElement[] = Array.from(providerRef.current.children);
      let heights: number[] = [];
      children.forEach((child) => {
        heights.push(child.getBoundingClientRect().height);
      });

      setTotalHeight(heights.reduce((a, b) => a + b, 0));
      setSectionsHeight(heights);
    };

    calculateTotalHeight();

    const handleResize = debounce(() => {
      calculateTotalHeight();
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sections]);

  // calculate the current page and progress based on the scroll position and the total height of the elements
  // update when the scroll position changes
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollBottom = scrollTop + window.innerHeight;
    let currentPage = 0;
    let progress = 0;
    let totalProgress = 0;

    sectionsHeight.forEach((sectionHeight, index) => {
      let scrollHeight = sectionsHeight
        .slice(0, index)
        .reduce((a, b) => a + b, 0);

      let anchorTo =
        anchor === "bottom" ? scrollBottom - offset : scrollTop + offset;

      // console.log(scrollHeight, scrollBottom);

      if (anchorTo >= scrollHeight) {
        currentPage = index;
        console.log("current page", currentPage);
        progress = (anchorTo - scrollHeight) / sectionHeight;
      }
    });

    // as percentage 1 = 100%
    totalProgress = (currentPage + progress) / sectionsCount;

    setCurrentSection(currentPage);
    setProgress(Math.min(Math.max(progress, 0), 1));
    setTotalProgress(Math.min(Math.max(totalProgress, 0), 1));
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionsHeight, totalHeight]);

  // // if is on debug mode, draw a red div at the end of every section
  // const [already, setAlready] = useState(false);
  // // do that only once when window loads
  // useEffect(() => {
  //   const drawDebugLines = () => {
  //     if (debugMode && !already) {
  //       sections.forEach((child, i) => {
  //         // append to the body, but place in a absolute position relative to the scroll
  //         const debugDiv = document.createElement("div");
  //         debugDiv.style.position = "absolute";
  //         debugDiv.style.width = "100%";

  //         debugDiv.style.top = `${sectionsHeight[i]}px`;
  //         debugDiv.style.height = `${40}px`;
  //         debugDiv.style.backgroundColor = "red";
  //         debugDiv.style.opacity = "1";
  //         debugDiv.style.zIndex = "99999";

  //         debugDiv.style.color = "white";

  //         debugDiv.innerHTML = `Section ${i + 1}`;

  //         document.body.appendChild(debugDiv);
  //       });
  //     }

  //     console.log("debug lines drawn");
  //     setAlready(true);
  //   };

  //   window.addEventListener("keydown", drawDebugLines);

  //   return () => {
  //     window.removeEventListener("keydown", drawDebugLines);
  //   };
  // }, [sectionsHeight, totalHeight]);

  return (
    <stickyrollContext.Provider
      value={
        {
          progress,
          totalProgress,
          currentSection,
          sectionsCount: sectionsCount,
          totalHeight,
          currentSectionHeight: sectionsHeight[currentSection],
        } as StickyrollContext
      }
    >
      <div
        ref={providerRef}
        style={{
          minHeight: "100vh",
          // minWidth: "100vw",
          maxWidth: "100vw",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        {sections?.map((Section, index) => {
          return Section;
        })}
      </div>

      {children}
    </stickyrollContext.Provider>
  );
};

export const useKabukiRoll = () => {
  const context = useContext(stickyrollContext);
  if (context === undefined) {
    throw new Error("useStickyroll must be used within a StickyrollProvider");
  }
  return context;
};
