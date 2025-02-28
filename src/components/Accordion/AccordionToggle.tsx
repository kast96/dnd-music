import React from 'react'

type PropsType = {
  children: React.ReactNode
  isOpen?: boolean
  className?: string
  setIsOpen?: (isOpen: boolean) => void
};

export const AccordionToggle: React.FC<PropsType> = ({ children, isOpen, className, setIsOpen }) => {
  return (
    <div className={className} onClick={() => setIsOpen?.(!isOpen)}>
      {children}
    </div>
  )
}