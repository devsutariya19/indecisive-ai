'use client'

import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function GenaiThinking({
  isVisible = true,
  className,
}: {isVisible: boolean, className: string}) {

  const [currentPhase, setCurrentPhase] = useState(0);
  const [dots, setDots] = useState('');

  const thinkingPhases = [
    "Reading your context",
    "Analysing information",
    "Considering options",
    "Making Decision"
  ]

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % thinkingPhases.length)
    }, 2500)

    const dotInterval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') {
          return ''
        }
        return prev + '.'
      })
    }, 500)

    return () => {
      clearInterval(phaseInterval);
      clearInterval(dotInterval)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className={cn(
        "flex justify-center items-center",
        className
      )}
    >
      <div className='text-center'>

        <div className='mb-8 flex justify-center'>
          <div className='relative'>
            
            <div className="absolute inset-0 -m-4">
              <div className="w-22 h-22 bg-emerald-100 rounded-full animate-pulse opacity-30"></div>
            </div>
            <div className="absolute inset-0 -m-2">
              <div className="w-18 h-18 bg-emerald-200 rounded-full animate-pulse opacity-40 delay-300"></div>
            </div>
            <div className="relative w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white animate-pulse" />
            </div>

            <div className="absolute -top-2 -right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-500"></div>
            <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse delay-700"></div>
            <div className="absolute top-1 -left-4 w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute -bottom-1 right-3 w-1 h-1 bg-emerald-300 rounded-full animate-pulse delay-1200"></div>

          </div>
        </div>

        <div className="space-y-5">
          <h2 className="text-xl font-medium text-white">
            Indecisive AI is thinking
          </h2>
          
          <p className="text-emerald-400 min-h-[24px]">
            {thinkingPhases[currentPhase]}{dots}
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          {thinkingPhases.map((_, index) => (
            <div key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentPhase ? 'bg-emerald-500' : index < currentPhase ? 'bg-emerald-300' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
