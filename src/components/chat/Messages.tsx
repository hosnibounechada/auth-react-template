import Message from "./Message";

const Messages = ({ messages }: { messages: { mine: boolean; text: string; avatar: string }[] }) => {
  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {messages.map(({ mine, text, avatar }, index) => (
        <Message key={index} mine={mine} text={text} avatar={avatar} />
      ))}
    </div>
  );
};

export default Messages;
