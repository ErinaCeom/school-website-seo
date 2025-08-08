"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";
import { Typography } from "@mui/material";
import { useCallback } from "react";

const editorConfig = {
  namespace: "NoticeEditor",
  theme: {
    paragraph: "editor-paragraph",
  },
  onError(error: Error) {
    throw error;
  },
  nodes: [],
};

export default function Editor({
  onChange,
}: {
  onChange: (editorState: string) => void;
}) {
  const handleChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        const content = JSON.stringify(editorState);
        onChange(content);
      });
    },
    [onChange],
  );

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            style={{
              minHeight: 200,
              padding: 16,
              border: "1px solid #ccc",
              borderRadius: 8,
              background: "#fff",
            }}
          />
        }
        placeholder={
          <Typography color="text.secondary">Write your notice...</Typography>
        }
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
}
