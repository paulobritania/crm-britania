import React, { createContext, useContext, useState } from 'react'

const LinesBuyersContext = createContext()

export function LinesBuyerProvider({ children }) {
  const [linesBuyers, setLinesBuyers] = useState([])

  function handleAddLine() {
    setLinesBuyers([
      ...linesBuyers,
      { line: '', family: '', responsible: '', regionalManager: '' }
    ])
  }

  function handleRemoveLine(idx) {
    setLinesBuyers(linesBuyers.filter((s, sidx) => idx !== sidx))
  }

  function handleLineChange(idx) {
    ;(evt) => {
      const newLine = linesBuyers.map((line, sidx) => {
        if (idx !== sidx) return line
        return { ...line, [evt.target.name]: evt.target.value }
      })

      setLinesBuyers(newLine)
    }
  }

  return (
    <LinesBuyersContext.Provider
      value={{ linesBuyers, handleAddLine, handleRemoveLine, handleLineChange }}
    >
      {children}
    </LinesBuyersContext.Provider>
  )
}

export function useLinesBuyers() {
  const context = useContext(LinesBuyersContext)

  return context
}
