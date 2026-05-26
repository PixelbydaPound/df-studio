import portraitImage from "figma:asset/a96981bb6877cda98199de6acc8b2114d354d90a.png";

export function HalftonePortrait() {
  return (
    <div
      style={{
        position: "relative",
        width: "120px",
        height: "120px",
        borderRadius: "72px",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <img
        src={portraitImage}
        alt="Daniel"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
