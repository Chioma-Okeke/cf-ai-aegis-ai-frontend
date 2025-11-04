import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
    Send,
    Bot,
    User,
    Copy,
    ThumbsUp,
    ThumbsDown,
    Loader2,
    Paperclip,
    Mic,
    MoreVertical
} from 'lucide-react'

interface Message {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
}

function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hello! I'm AegisAI, your intelligent assistant. How can I help you today?",
            role: 'assistant',
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            role: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsLoading(true)

        // Simulate AI response
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "I understand your question. This is a simulated response from AegisAI. In a real implementation, this would connect to your AI backend service.",
                role: 'assistant',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, assistantMessage])
            setIsLoading(false)
        }, 1500)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const copyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content)
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-76px)] w-full max-w-[450px] bg-background border rounded-lg">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b bg-card">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                        <h3 className="font-semibold">AegisAI Assistant</h3>
                        <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.role === 'assistant' && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary shrink-0 mt-1">
                                <Bot className="w-4 h-4 text-primary-foreground" />
                            </div>
                        )}

                        <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                            <div
                                className={`rounded-lg p-3 ${message.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>

                            <div className={`flex items-center gap-2 mt-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <span className="text-xs text-muted-foreground">
                                    {formatTime(message.timestamp)}
                                </span>

                                {message.role === 'assistant' && (
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => copyToClipboard(message.content)}
                                        >
                                            <Copy className="w-3 h-3" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                            <ThumbsUp className="w-3 h-3" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                            <ThumbsDown className="w-3 h-3" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {message.role === 'user' && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary shrink-0 mt-1">
                                <User className="w-4 h-4 text-secondary-foreground" />
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 justify-start">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary shrink-0 mt-1">
                            <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm text-muted-foreground">AegisAI is thinking...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <Separator />

            {/* Input Area */}
            <div className="p-4 bg-card">
                <div className="flex items-end gap-2">
                    <Button variant="ghost" size="icon" className="shrink-0">
                        <Paperclip className="w-4 h-4" />
                    </Button>

                    <div className="flex-1 relative">
                        <Label htmlFor="chat-input" className="sr-only">
                            Type your message
                        </Label>
                        <Input
                            id="chat-input"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                            className="min-h-10 resize-none pr-12"
                        />
                    </div>

                    <Button variant="ghost" size="icon" className="shrink-0">
                        <Mic className="w-4 h-4" />
                    </Button>

                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        size="icon"
                        className="shrink-0"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </Button>
                </div>

                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>Press Enter to send, Shift+Enter for new line</span>
                    <span>{inputValue.length}/2000</span>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface