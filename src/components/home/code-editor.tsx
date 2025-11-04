import React, { useState } from 'react'
import MonacoEditor from './monaco-editor'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { programmingLanguages } from '@/lib/constants'
import { Button } from '../ui/button'

function CodeEditor() {
    const [language, setLanguage] = useState<string>("javascript")
    return (
        <section className='flex-1 max-h-[calc(100vh-76px)] space-y-3'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3 flex-1 w-full max-w-sm'>
                    <Label className='w-fit'>Choose your language</Label>
                    <Select defaultValue={language} onValueChange={(val) => setLanguage(val)}>
                        <SelectTrigger className='w-full flex-1'>
                            <SelectValue defaultValue={language} placeholder="Select a language" />
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
                    <Button>Submit</Button>
                </div>
            </div>
            <div>
                <MonacoEditor language={language} />
            </div>
        </section>
    )
}

export default CodeEditor