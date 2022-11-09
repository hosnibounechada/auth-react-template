import { MessageItem } from "./message-item";
import { useEffect, useRef } from "react";
import { useAuth, useChat, useRequestPrivate } from "../../hooks";

interface Message {
  from: string;
  to: string;
  type: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

const MessagesList = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { auth } = useAuth();
  const { user, messages, setMessages, page, setPage } = useChat();
  const { doRequestPrivate: doGetMessages } = useRequestPrivate({ url: `/messages/private/${user?.id}?page=${page}`, method: "get" });

  useEffect(() => {
    console.log("page useEffect");
    const getMessages = async () => {
      if (!user || page === 0) return;
      console.log("page worked");
      const { messages: userMessages } = await doGetMessages();
      if (!userMessages) return;
      const reversedArray = userMessages.reverse();
      const result = reversedArray.map((message: Message) => {
        return {
          mine: message.from === auth.user?.id,
          text: message.content,
          avatar: user.thumbnail,
        };
      });
      if (result.length > 0 && page !== 0) setMessages([...result, ...messages]);
    };

    getMessages();
  }, [page]);

  useEffect(() => {
    var varRef = ref.current;
    const handleScroll = () => {
      if (varRef?.scrollTop === 0)
        setPage((prev) => {
          return ++prev;
        });
    };

    varRef?.addEventListener("scroll", handleScroll);

    return () => {
      varRef?.removeEventListener("scroll", handleScroll);
    };
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

export { MessagesList };
