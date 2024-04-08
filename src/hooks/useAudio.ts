import { useEffect, useState } from "react";
import { Howl } from "howler";
import { useLayoutContext } from "@/components/layouts/LayoutProvider";

export default function useAudio(srcPath: string) {
  const [audio, setAudio] = useState<Howl>();
  const { acceptedToPlay } = useLayoutContext();

  useEffect(() => {
    const howl = new Howl({
      src: srcPath,
      onplayerror: (e, d) => {
        howl.once("unlock", () => {
          acceptedToPlay && howl.play();
        });
      },
      loop: true,
      volume: 0.4,
      autoplay: true,
    });
    setAudio(howl);

    return () => {
      howl.unload();
    };
  }, []);

  return [audio] as const;
}
