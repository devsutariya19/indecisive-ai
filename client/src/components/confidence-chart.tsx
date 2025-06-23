import React from 'react'
import { ChartContainer } from './ui/chart'
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

export default function ConfidenceChart({confidence}: any) {

  const chartConfig = {
    confidence: {
      label: "Confidence",
      color: "var(--chart-2)"
    }
  }

  const chartData = [
    {
      name: "progress",
      value: confidence,
      fill: "url(#confidenceGradient)"
    }
  ]

  return (
    <>
      <ChartContainer config={chartConfig} className='aspect-square max-h-[150px]'>
        <RadialBarChart 
          data={chartData} 
          startAngle={90}
          endAngle={90 + (360 * confidence / 100)}
          innerRadius={60}
          outerRadius={90}
        >
          <defs>
            <linearGradient id="confidenceGradient" x1="15%" y1="0%" x2="100%" y2="00%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <PolarGrid
            gridType='circle'
            radialLines={false}
            stroke='none'
            className='first:fill-muted last:fill-background'
            polarRadius={[65, 55]}
          />
          <RadialBar dataKey="value" background cornerRadius={10} fill="url(#confidenceGradient)" />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                        {confidence}%
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                        Confident
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </>
  )
}
