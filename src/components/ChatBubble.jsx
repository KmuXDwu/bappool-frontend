import CharacterImage from "./CharacterImage";

function ChatBubble({
  children,
  align = "left",
  orange = false,
  avatar = false,
  avatarSrc = "",
}) {
  return (
    <div className={`bubble-row ${align}`}>
      {avatar && (
        <CharacterImage src={avatarSrc} alt="" className="chat-avatar" />
      )}

      <p className={orange ? "chat-bubble orange" : "chat-bubble"}>
        {children}
      </p>
    </div>
  );
}

export default ChatBubble;
