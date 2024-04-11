export default function CatLoader({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <video width={width} height={height} controls preload="none" autoPlay loop>
      <source src="/cat-animation.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}
