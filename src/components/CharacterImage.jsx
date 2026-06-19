function CharacterImage({ src, alt = "", className = "" }) {
  return (
    <span className={`character-image ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={(event) => {
          event.currentTarget.classList.add("is-missing");
        }}
      />
    </span>
  );
}

export default CharacterImage;
