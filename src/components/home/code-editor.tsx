import MonacoEditor from './monaco-editor'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { programmingLanguages } from '@/lib/constants'
import { Button } from '../ui/button'
import { useChatStore } from '@/store/chat-store'
import ChatService from '@/services/chat-service'
import { jsonParser } from '@/lib/utils'
import type { IChatMessage } from '@/types'

function CodeEditor() {
    const { language, addLanguage, fixedCode, addCode, addFixedCode, addMessage, addSessionId, sessionId } = useChatStore();

    const applyFixedCodeChanges = async () => {
        if (fixedCode) {
            addCode(fixedCode);
            addFixedCode?.("");
        } else {
            const chatService = new ChatService()
            const aiResponse = await chatService.analyzeCode({
                code: useChatStore.getState().code,
                message: "",
                language: language || 'javascript',
            }, (sessionId ?? ''))

            const parsedAiResponse = jsonParser(aiResponse.response.response)
            console.log(parsedAiResponse)

            const assistantMessage: IChatMessage = {
                id: aiResponse.sessionId,
                content: parsedAiResponse.analysis,
                notes: parsedAiResponse.notes,
                role: 'assistant',
                timestamp: new Date().toISOString()
            }
            addMessage(assistantMessage)
            addSessionId?.(aiResponse.sessionId);
            addFixedCode?.(parsedAiResponse.fixedCode);
        }
    }

    return (
        <section className='max-h-[calc(100vh-70px)] space-y-3 flex-1 min-w-0'>
            <div className='flex items-center justify-between gap-5'>
                <div className='flex items-center gap-3 flex-1 w-full max-w-sm p-2'>
                    <Label className='w-fit max-lg:hidden'>Choose your language</Label>
                    <Select defaultValue={language?.toLowerCase()} onValueChange={(val) => addLanguage(val)}>
                        <SelectTrigger className='w-full flex-1'>
                            <SelectValue defaultValue={language?.toLowerCase()} placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                            {programmingLanguages.map((lang) => {
                                return <SelectItem key={lang} value={lang.toLowerCase()}>
                                    {lang}
                                </SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Button onClick={applyFixedCodeChanges}>{fixedCode ? 'Apply Changes' : 'Submit'}</Button>
                </div>
            </div>
            <div>
                <MonacoEditor language={language?.toLowerCase()} />
            </div>
        </section>
    )
}

export default CodeEditor