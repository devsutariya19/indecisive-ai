'use client'

import OptionCard from '@/components/option-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { OptionData } from '@/types/OptionData'
import { BrainCircuit, Plus, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

export default function InputCard() {

  const [options, setOptions] = useState<OptionData[]>([
    {id: 1, name: '', pros: [''], cons: ['']},
    {id: 2, name: '', pros: [''], cons: ['']},
  ])

  const handleCardUpdate = (updateCardData: any) => {
    
  }

  const handleCardRemove = (id: any) => {
    if (options.length > 2) {
      setOptions((prev) => prev.filter((opt: any) => opt.id != id))
    }
  }

  const addOption = () => {
    const newCard = {
      id: options.length + 1,
      name: '',
      pros: [''],
      cons: ['']
    }
    setOptions((prev) => [...prev, newCard])
  }

  return (
    <> 
      <Card className="m-5 p-3 gap-8 sm:p-5">
        <div className='flex flex-row gap-4'>
          <div className='w-14 h-14 bg-gradient-to-r from-emerald-600 dark:from-emerald-500 to-blue-700 rounded-xl flex flex-row items-center justify-center'>
            <BrainCircuit className='w-8 h-8 text-white'/>
          </div>
          <div>
            <h1 className='text-2xl font-bold mb-1'>What's been on your mind?</h1>
            <p className='text-sm'>Share the main question that you need answered.</p>
          </div>
        </div>
        <div>
          <Input placeholder='What decision do you need to make?'/>
        </div>
      </Card>
      <Card className='m-5 p-3 gap-8 sm:p-5'>
        <div className='flex flex-row gap-4'>
          <Sparkles className='w-7 h-7'/>
          <h1 className='text-xl font-semibold'>Additional Context</h1>
        </div>
        <Textarea placeholder="Share any constraints, priorities, or context that might influence this decision..."/>
      </Card>
      <div>
        {options.map((opt: any, index: number) => {
          return (
            <OptionCard 
              key={opt.id} 
              optNo={String.fromCharCode(65 + index)} 
              opt={opt} 
              multiple={options.length > 2} 
              removeCard={() => handleCardRemove(opt.id)} 
              onUpdate={handleCardUpdate}
            />
          )
        })}
      </div>
      <div className='flex flex-row justify-center m-5 px-5 gap-8'>
        <Button variant="outline" size="lg" onClick={addOption}>
          <Plus/> Add Option
        </Button>
      </div>
    </>
  )
}