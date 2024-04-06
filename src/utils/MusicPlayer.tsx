import ReactPlayer from "react-player";

export const MusicPlayer = () => {
  return (
    <ReactPlayer
      url="evoce.mp3"
      playing={true}
      controls={false}
      width="0"
      height="0"
    />
  );
};
