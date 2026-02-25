import React from "react";

const NameAvatar = ({
  src = "/images/default-avatar.jpg",
  name = "",
  size = 45,
  className = "",
}) => {
  const initial =
    name && typeof name === "string" && name.trim().length > 0
      ? name.trim().charAt(0).toUpperCase()
      : "?";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        background: "#FF69B4",
        color: "white",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.45,
      }}
      className={className}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        initial
      )}
    </div>
  );
};

export default NameAvatar;
