import { hide } from '@popperjs/core'
import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback, useRef } from 'react'
import Portal from './Portal'
import { FiX } from 'react-icons/fi'

export const ModalHeadless = forwardRef(({ children, defaultOpened = true, clearState = null, disableCloseOutside = false }, ref) => {
  const [open, setOpen] = useState(defaultOpened)
  const itRef = useRef(null)
  const isMounted = useRef(false)

  useImperativeHandle(ref, () => ({
    open: () => {
      if (isMounted.current) setOpen(true)
    },
    close: () => {
      if (isMounted.current) setOpen(false)
      if (clearState) clearState()
    }
  }),
    [open],
  )

  const handleEscape = useCallback((e) => {
    if (e.keyCode === 27) setOpen(false)
  }, [],
  )

  useEffect(() => {
    isMounted.current = true
    const handleClickOutside = (event) => {
      if (!itRef || !itRef.current) return false
      if (!open || itRef.current.contains(event.target) || disableCloseOutside) {
        return false
      }
      setOpen(!open)
      if (clearState) clearState()
    }

    document.addEventListener('keydown', handleEscape, false)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      isMounted.current = false
      document.removeEventListener('keydown', handleEscape, false)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, handleEscape, itRef])

  return (
    <>
      {open && (
        // <Portal selector="#portal">
        <>
          <div className="modal-backdrop fade-in"></div>
          <div
            className="modal show"
            data-background="light">
            <div
              className="relative w-full lg:my-4 mx-auto lg:max-w-lg max-w-sm"
              ref={itRef}>
              <div className="bg-white text-grey-900 border-grey-200 dark:text-white border-0 shadow-lg relative flex flex-col w-full justify-center outline-none">
                <button
                    className="ml-auto mt-1 mr-1"
                    type="button"
                    onClick={(e) => setOpen(false)}>
                    <FiX size={16} className="text-east-bay-500" />
                </button>
                {children}
              </div>
            </div>
          </div></>
        // {/* </Portal> */}
      )}
    </>
  )
})