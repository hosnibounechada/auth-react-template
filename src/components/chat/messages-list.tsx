import MessageItem from "./message-item";
import { useEffect, useRef } from "react";
import { useMessages } from "../../hooks";

const MessagesList = ({ onScrollTop }: { onScrollTop: CallableFunction }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { messages } = useMessages();

  useEffect(() => {
    var varRef = ref.current;
    const handleScroll = () => {
      if (varRef?.scrollTop === 0) onScrollTop();
    };

    varRef?.addEventListener("scroll", handleScroll);

    return () => {
      varRef?.removeEventListener("scroll", handleScroll);
    };
  }, [onScrollTop]);
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
