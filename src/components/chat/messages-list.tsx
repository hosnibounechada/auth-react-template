import MessageItem from "./message-item";
import { useEffect, useRef } from "react";

const MessagesList = ({ messages }: { messages: { mine: boolean; text: string; avatar: string }[] }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={ref}
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {messages.map(({ mine, text, avatar }, index) => (
        <MessageItem key={index} mine={mine} text={text} avatar={avatar} />
      ))}
    </div>
  );
};

export default MessagesList;
