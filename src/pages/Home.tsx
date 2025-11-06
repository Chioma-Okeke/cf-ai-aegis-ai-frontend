import CodeEditor from "@/components/home/code-editor"
import RightPanel from "@/components/home/right-panel"

function Home() {
    return (
        <section className="relative flex gap-3 h-full min-w-0">
            <CodeEditor />
            <RightPanel/>
        </section>
    )
}

export default Home