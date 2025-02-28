import React from 'react'

type PropsType = {
  children: React.ReactNode
  isOpen?: boolean
  className?: string
}

export const AccordionContent: React.FC<PropsType> = ({ children, isOpen, className }) => {
  return isOpen ? <div className={className}>{children}</div> : null
}