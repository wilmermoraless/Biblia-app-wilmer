import React from "react";

interface PassageProps {
  reference: string;
  content: string;
}

const Passage: React.FC<PassageProps> = ({ reference, content }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center">{reference}</h2>
      <div className="mt-4 text-justify" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default Passage;