import React, { createContext, useState, useContext } from 'react'

const LinesBuyersContext = createContext()

export function LinesBuyerProvider({ children }) {
  const [linesFamiliesForm, setLinesFamiliesForm] = useState([{}])
  const [linesBuyers, setLinesBuyers] = useState([])
  const [linesFromApi, setLinesFromApi] = useState([])
  const [familiesFromApi, setFamiliesFromApi] = useState([])
  const [responsibleFromApi, setResponsibleFromApi] = useState([])
  const [regionalFromApi, setRegionalFromApi] = useState([])

  function handleLinesFamiliesForm(field, value, text, idx) {
    var newObj = {}

    if (field == 'family') {
      newObj = {
        familyCode: value,
        familyDescription: text
      }
    } else if (field == 'regionalManager') {
      newObj = {
        regionalManagerCode: value,
        regionalManagerDescription: text
      }
    } else {
      newObj = {
        lineCode: value,
        lineDescription: text
      }
    }

    const teste = linesFamiliesForm.map((item, index) => {
      if (index !== idx) return [...linesFamiliesForm, { ...newObj }]
      return { ...item, ...newObj }
    })

    console.log(teste)

    setLinesFamiliesForm(teste)
  }

  function handleAddLine() {
    setLinesBuyers((prevLines) => {
      return [...prevLines, {}]
    })
  }

  function handleRemoveLine(idx) {
    setLinesBuyers(linesBuyers.filter((s, sidx) => idx !== sidx))
  }

  function handleLineChange(idx, evt) {
    const text = evt.nativeEvent.target.innerText
    const value = evt.target.value
    const name = evt.target.name

    const newLine = linesBuyers.map((line, sidx) => {
      if (idx !== sidx) return line
      return {
        ...line,
        [name]: value
      }
    })

    setLinesBuyers(newLine)
    handleLinesFamiliesForm(name, value, text, idx)
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
        linesFamiliesForm,
        handleAddLine,
        handleRemoveLine,
        handleLineChange,
        handleArrayLines,
        handleArrayFamilies,
        handleArrayResponsible,
        handleArrayRegional
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
