"use client"

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
    value: {
        code: string
        language?: string
        filename?: string
    }
}

export const CodeBlock = ({ value }: CodeBlockProps) => {
    const { code, language, filename } = value

    if (!code) {
        return null
    }

    return (
        <div className="my-4 rounded-lg overflow-hidden bg-card ring ring-border/25 shadow-sm">
            {filename && (
                <div className="text-xs text-gray-500 px-4 py-1 bg-gray-100 border-b border-border/25">
                    {filename}
                </div>
            )}
            <SyntaxHighlighter
                language={language || 'text'}
                style={oneLight}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    backgroundColor: 'transparent',
                }}
                codeTagProps={{
                    style: {
                        fontFamily: 'monospace',
                    }
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}
