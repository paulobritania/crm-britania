import { useMemo } from 'react'

export const useDemo1Chart = () => {
  const data1 = useMemo(() => [1, 2.5, 3, 3], [])
  const data2 = useMemo(() => [3, 1, 2.5, 2.9], [])

  const chartOptions = useMemo(
    () => ({
      title: { text: 'My Chart' },
      series: [
        { type: 'line', data: data1 },
        { type: 'line', data: data2 }
      ]
    }),
    [data1, data2]
  )

  return chartOptions
}
