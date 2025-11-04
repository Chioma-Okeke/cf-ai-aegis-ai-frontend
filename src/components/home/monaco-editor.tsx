import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  language?: string
}

function MonacoEditor({ language }: MonacoEditorProps) {
  const height = `calc(100vh - 76px - 60px)`
  return (
    <Editor
      height={height}
      defaultLanguage="javascript"
      language={language}
      defaultValue="// some comment"
      
    />
  )
}

export default MonacoEditor