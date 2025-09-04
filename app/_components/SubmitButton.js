"use client"
import { useFormStatus } from "react-dom";


export default function SubmitButton({ children, pendingLabel }) {
    const { pending } = useFormStatus();
    return (
        <button className="bg-colors-accent-500 px-8 py-4 text-colors-primary-800 font-semibold hover:bg-colors-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300" disabled={pending} >
            {pending ? pendingLabel : children}
        </button>
    )
}
