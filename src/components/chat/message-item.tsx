import { useEffect, useRef } from "react";
const MessageItem = ({ mine, text, avatar }: { mine: boolean; text: string; avatar: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  return (
    <div className="chat-message" ref={ref}>
      <div className={`flex items-end${mine ? " justify-end" : ""}`}>
        <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2${mine ? " order-1 items-end" : " order-2 items-start"}`}>
          <span
            className={`text-lg px-4 py-2 rounded-lg inline-block${
              mine ? " rounded-br-none bg-blue-600 text-white" : " rounded-bl-none bg-gray-300 text-gray-600"
            }`}
          >
            {text}
          </span>
        </div>
        <img src={avatar} alt="My profile" className={`w-6 h-6 rounded-full${mine ? " order-2" : " order-1"}`} />
      </div>
    </div>
  );
};

export default MessageItem;
