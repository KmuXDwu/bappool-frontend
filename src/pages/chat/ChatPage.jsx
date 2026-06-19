import { useState } from "react";
import { Hash, Plus, Smile } from "lucide-react";

import BackButton from "../../components/BackButton";
import FakeKeyboard from "../../components/FakeKeyboard";

function ChatPage({ partner, images, onBack }) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  return (
    <div className={isKeyboardOpen ? "chat-page keyboard-open" : "chat-page"}>
      <header className="chat-top">
        <BackButton onClick={onBack} className="chat-back-button" />
        <h1>{partner.fullName}</h1>
      </header>

      <div
        className="chat-body empty-chat-body"
        onClick={() => setIsKeyboardOpen(false)}
      >
        <img className="chat-rice-back" src={images.chatRiceBack} alt="" />
      </div>

      <button
        className="chat-input-row"
        type="button"
        onClick={() => setIsKeyboardOpen(true)}
      >
        <Plus size={23} />
        <span>메시지 입력</span>
        <Smile size={22} />
        <Hash size={19} />
      </button>

      {isKeyboardOpen && <FakeKeyboard />}
    </div>
  );
}

export default ChatPage;
