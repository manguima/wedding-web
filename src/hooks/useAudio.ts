import { useEffect, useState } from "react";
import { Howl } from "howler";
import { useLayoutContext } from "@/components/layouts/LayoutProvider";

export default function useAudio(srcPath: string) {
  const [audio, setAudio] = useState<Howl>();
  const { acceptedToPlay, setAcceptedToPlay } = useLayoutContext();

  useEffect(() => {
    const howl = new Howl({
      src: srcPath,
      onplayerror: (e, d) => {
        howl.once("unlock", () => {
          if (acceptedToPlay) {
            howl.play();
            setAcceptedToPlay(true);
          }
        });
      },
      loop: true,
      volume: 0.4,
    });
    setAudio(howl);

    return () => {
      howl.unload();
    };
  }, []);

  return [audio] as const;
}
