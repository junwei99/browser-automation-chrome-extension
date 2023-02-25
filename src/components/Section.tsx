import React from "react";

type TSectionProps = {
  text: string;
  children: React.ReactNode;
};

const Section: React.FC<TSectionProps> = ({ text, children }) => {
  return (
    <div className="flex w-full gap-5 justify-center items-center">
      <span className="flex-[2] text-sm font-medium text-gray-900 dark:text-gray-300 text-right">
        {text}
      </span>
      <div className="flex-[3]">{children}</div>
    </div>
  );
};

export default Section;
