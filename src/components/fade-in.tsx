"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function FadeIn({
    children,
    delay,
}: {
    children: React.ReactNode
    delay?: number
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    )
}
