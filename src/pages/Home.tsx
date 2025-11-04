import ChatInterface from "@/components/home/chat-interface"
import CodeEditor from "@/components/home/code-editor"

function Home() {
    return (
        <section className="flex gap-3 overflow-hidden h-full">
            <CodeEditor />
            <ChatInterface />
        </section>
    )
}

export default Home