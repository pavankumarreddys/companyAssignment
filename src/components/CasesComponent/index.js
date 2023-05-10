import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    group_name: 'Group A',
    boys: 200,
    girls: 90,
  },
  {
    group_name: 'Group B',
    boys: 3000,
    girls: 500,
  },
  {
    group_name: 'Group C',
    boys: 1000,
    girls: 1500,
  },
  {
    group_name: 'Group D',
    boys: 700,
    girls: 1200,
  },
]

const CasesComponent = props => {
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  const {chartsList} = props

  console.log(chartsList[0])

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={chartsList}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="country"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />

        <Bar dataKey="cases" name="cases" fill="red" barSize="10%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CasesComponent
