import React from "react";

function MessagingContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-[calc(100vh-65px)]">{children}</div>;
}

export default MessagingContainer;
