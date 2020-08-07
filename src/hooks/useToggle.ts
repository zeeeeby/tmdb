import React, { useCallback } from 'react'

export const useToggle = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  return [isOpen, toggle] as const
}
