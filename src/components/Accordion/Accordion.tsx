import React, { useState } from 'react'
import { AccordionToggle } from './AccordionToggle'
import { AccordionContent } from './AccordionContent'

type AccordionPropsType = {
  children: React.ReactNode
  className?: string
}

export const Accordion: React.FC<AccordionPropsType> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={[className, isOpen ? 'is-open' : ''].join(' ')}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{
            isOpen?: boolean
            setIsOpen?: (isOpen: boolean) => void
          }>, { isOpen, setIsOpen })
        }
        return child
      })}
    </div>
  )
}

export { AccordionToggle, AccordionContent }