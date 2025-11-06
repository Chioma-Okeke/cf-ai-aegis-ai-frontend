import { useChatStore } from '@/store/chat-store';
import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  language?: string
}

function MonacoEditor({ language }: MonacoEditorProps) {
  const { code, addCode } = useChatStore();
  const height = `calc(100vh - 76px - 60px)`
  return (
    <Editor
      height={height}
      defaultLanguage="javascript"
      language={language}
      value={code}
      onChange={(value) => addCode(value ?? "")}
      defaultValue="// some comment"
      options={{
        minimap: {enabled: false},
        fontSize: 14,
        wordWrap: "on",
        autoClosingBrackets: "always",
        lineNumbers: "on",
      }}
    />
  )
}

export default MonacoEditor