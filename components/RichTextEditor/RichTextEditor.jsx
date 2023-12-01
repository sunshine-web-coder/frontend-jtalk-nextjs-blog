"use client";

import React, { useRef, useState } from "react";

export default function RichTextEditor() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const contentEditableRef = useRef(null);

  const handleContentChange = () => {
    const newContent = contentEditableRef.current.innerHTML;
    setContent(newContent);
  };

  const handleCommand = (command) => {
    document.execCommand(command, false, null);
    contentEditableRef.current.focus();
  };

  const handleSubmit = () => {
    setResult(content);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleCommand("bold")}>Bold</button>
        <button onClick={() => handleCommand("italic")}>Italic</button>
        <button onClick={() => handleCommand("underline")}>Underline</button>
      </div>
      <div
        ref={contentEditableRef}
        contentEditable="true"
        onInput={handleContentChange}
        style={{ border: "1px solid #ccc", minHeight: "100px" }}
      ></div>
      <button onClick={handleSubmit}>Submit</button>
      {result && (
        <div>
          <p>Formatted Text Result:</p>
          <div dangerouslySetInnerHTML={{ __html: result }}></div>
        </div>
      )}
    </div>
  );
}
