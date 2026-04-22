import { Cell, Pie, PieChart } from 'recharts'
import { useSelector } from 'react-redux'

export default function Records ({percentage}) {
  const { appearance } = useSelector(state => state.preferences)

  return (
    <div className='relative flex items-center h-40 justify-center'>
      <PieChart height={200} width={210}>
        <Pie
          data={[{ value: 100 }]}
          cx={100}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={75}
          outerRadius={75}
          dataKey='value'
          stroke={appearance.theme == 'dark' ? '#404040' : '#e2e8f0'}
          strokeWidth={55}
          strokeDasharray='6 6'
          isAnimationActive={false}
          fill='none'
        />
        <Pie
          data={[{ value: percentage }, { value: 100 - percentage }]}
          cx={100}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={75}
          outerRadius={75}
          dataKey='value'
          stroke='none'
          isAnimationActive={true}
        >
          <Cell
            fill='none'
            stroke='#ff9619'
            strokeWidth={55}
            strokeDasharray='6 6'
          />

          <Cell fill={appearance.theme == 'dark' ? 'white' : 'black'} />
        </Pie>
      </PieChart>

      <div className='absolute top-18.75 flex flex-col items-center'>
        <span className={`text-3xl font-bold ${
          appearance.theme == 'dark' ? 'text-white' : 'text-black'
        }`}>5/10</span>
        <span className={`text-[10px] uppercase font-medium tracking-tight ${
          appearance.theme == 'dark' ? 'text-slate-500' : 'text-slate-400'
        }`}>
          Number of applications today
        </span>
      </div>
    </div>
  )
}
