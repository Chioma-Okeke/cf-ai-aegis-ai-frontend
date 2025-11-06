import React from 'react'
import { Button } from '../ui/button'
import { Stars } from 'lucide-react'
import { cn } from '@/lib/utils';
import ChatInterface from './chat-interface';

function RightPanel() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)} className='absolute bottom-6 right-6 lg:hidden p-2'>
                <Stars />
            </Button>
            <div className={cn('border-red-500 fixed top-0 right-0 z-50 h-full w-full min-w-[250px] max-lg:mx-auto transition-all duration-300 ease-in-out lg:ml-auto lg:w-[40%] lg:relative lg:max-w-[270px] xl:max-w-[400px]', {
                'max-lg:translate-x-0 max-lg:opacity-100': isOpen,
                'max-lg:translate-x-full max-lg:opacity-0': !isOpen,
            })}>
                <ChatInterface setIsOpen={setIsOpen} />
            </div>
        </>
    )
}

export default RightPanel