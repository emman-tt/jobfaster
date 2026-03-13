import { Cell, Pie, PieChart } from 'recharts'

export default function Records () {
  const percentage = 80
  const data = [
    { name: 'Progress', value: percentage },
    { name: 'Remaining', value: 100 - percentage }
  ]

  return (
    <div className='relative flex items-center h-40 justify-center '>
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
          stroke='#e2e8f0'
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

          <Cell fill='black' />
        </Pie>
      </PieChart>

      <div className='absolute top-18.75 flex flex-col items-center'>
        <span className='text-3xl font-bold'>5/10</span>
        <span className='text-[10px] text-slate-400 uppercase font-medium tracking-tight'>
          Number of applications today
        </span>
      </div>
    </div>
  )
}
