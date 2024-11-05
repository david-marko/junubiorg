'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

export function SubmitButton({ text }: { text: string }) {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} variant={pending ? 'ghost' : 'default'} type="submit">
            {pending ? 'loading...' : text}
        </Button>
    )
}