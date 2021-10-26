import React, { createContext, useState, useContext } from 'react'

const LinesBuyersContext = createContext()

export function LinesBuyerProvider({ children }) {
  const [linesBuyers, setLinesBuyers] = useState([])
  const [linesFromApi, setLinesFromApi] = useState([])
  const [familiesFromApi, setFamiliesFromApi] = useState([])
  const [responsibleFromApi, setResponsibleFromApi] = useState([])
  const [regionalFromApi, setRegionalFromApi] = useState([])

  function handleAddLine() {
    setLinesBuyers((prevLines) => {
      return [...prevLines, {}]
    })
  }

  function handleRemoveLine(idx) {
    setLinesBuyers(linesBuyers.filter((s, sidx) => idx !== sidx))
  }

  function handleLineChange(idx, evt, formRef) {
    const text = evt.nativeEvent.target.innerText
    const value = evt.target.value
    const name = evt.target.name

    const newLine = linesBuyers.map((line, sidx) => {
      if (idx !== sidx) return line
      return {
        ...line,
        [name + 'Code']: value,
        [name + 'Description']: text
      }
    })

    setLinesBuyers(newLine)
    formRef.current.setFieldValue('linesFamilies', newLine)
  }

  function handleArrayLines(idx, value) {
    let newArray = [...linesFromApi]
    newArray[idx] = value

    setLinesFromApi(newArray)
  }

  function handleArrayFamilies(idx, value) {
    let newArray = [...familiesFromApi]
    newArray[idx] = value

    setFamiliesFromApi(newArray)
  }

  function handleArrayResponsible(idx, value) {
    let newArray = [...responsibleFromApi]
    newArray[idx] = value

    setResponsibleFromApi(newArray)
  }

  function handleArrayRegional(idx, value) {
    let newArray = [...regionalFromApi]
    newArray[idx] = value

    setRegionalFromApi(newArray)
  }

  return (
    <LinesBuyersContext.Provider
      value={{
        linesBuyers,
        linesFromApi,
        familiesFromApi,
        responsibleFromApi,
        regionalFromApi,
        handleAddLine,
        handleRemoveLine,
        handleLineChange,
        handleArrayLines,
        handleArrayFamilies,
        handleArrayResponsible,
        handleArrayRegional,
        setLinesBuyers
      }}
    >
      {children}
    </LinesBuyersContext.Provider>
  )
}

export const useLinesBuyers = () => {
  const context = useContext(LinesBuyersContext)

  return context
}
