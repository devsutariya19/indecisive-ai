import { Plus, Circle, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { OptionData } from '@/types/OptionData'

export default function OptionCard({optNo, opt, multiple, removeCard, onUpdate}: any) {
  
  const [pros, setPros] = useState<OptionData["pros"]>(opt.pros)
  const [cons, setCons] = useState<OptionData["cons"]>(opt.cons)

  const handleChange = (event: any) => {
    console.log(event)
  }

  const addPro = () => {
    setPros((prev) => [...prev, ''])
  }
  
  const removePro = (index: number) => {
    if (pros.length > 1) {
      setPros((prev) => prev.filter((_: any, i: number) => i != index))
    }
  } 
  
  const addCon = () => {
    setCons((prev) => [...prev, ''])
  }

  const removeCon = (index: any) => {
    if (cons.length > 1) {
      setCons((prev) => prev.filter((_: any, i: number) => i != index))
    }
  } 

  const handleCardRemove = () => {
    removeCard()
  }

  return (
    <div>
      <Card className='m-5 p-3 gap-3 sm:p-5'>

        <div className='flex flex-row gap-4'>
          <div className="bg-cyan-800 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            {optNo}
          </div>
          <input placeholder={`Option ${optNo} name`} 
            className='text-lg font-medium bg-transparent border-none text-white placeholder-gray-400 focus:outline-none flex-1'/>
          
          {multiple && (
            <X className='w-4 h-4 opacity-50 hover:opacity-80 hover:cursor-pointer' onClick={handleCardRemove}/>
          )}
        </div>

        <Card className='m-1 p-5 gap-3 items-start'>
          <div className='flex flex-row gap-2 items-center'>
            <Circle className='w-3 h-3 bg-emerald-800 dark:bg-emerald-400 rounded-full'/>
            <span>Pros</span>
          </div>

          {pros.map((pro: any, index: any) => {
            return (
              <div key={`p${index}`} className='flex w-full items-center gap-2'>
                <Input placeholder='Add a positive aspect' onChange={handleChange}/>
                {pros.length > 1 && (
                  <X className='w-4 h-4 opacity-50 hover:opacity-80 hover:cursor-pointer' onClick={(event) => removePro(index)}/>
                )}
              </div>
            )
          })}

          <Button variant="link" className='!px-0 hover:cursor-pointer' onClick={addPro}>
            <Plus className='w-5 h-5'/>
            <span>Add Pro</span>
          </Button>
        </Card>

        <Card className='m-1 p-5 gap-3 items-start'>
          <div className='flex flex-row gap-2 items-center'>
            <Circle className='w-3 h-3 bg-red-800 dark:bg-red-400 rounded-full'/>
            <span>Cons</span>
          </div>

          {cons.map((con: any, index: any) => {
            return (
              <div key={`c${index}`} className='flex w-full items-center gap-2'>
                <Input placeholder='Add a positive aspect' onChange={handleChange}/>
                {cons.length > 1 && (
                  <X className='w-4 h-4 opacity-50 hover:opacity-80 hover:cursor-pointer' onClick={(event) => removeCon(index)}/>
                )}
              </div>
            )
          })}

          <Button variant="link" className='!px-0 hover:cursor-pointer' onClick={addCon}>
            <Plus className='w-5 h-5'/>
            <span>Add Con</span>
          </Button>
        </Card>

      </Card>
    </div>
  )
}