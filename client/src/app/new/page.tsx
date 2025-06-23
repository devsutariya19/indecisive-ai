'use client'

import OptionCard from '@/components/option-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getUUID } from '@/lib/utils'
import { OptionData } from '@/types/OptionData'
import { v4 as uuidv4 } from 'uuid';
import { Brain, BrainCircuit, Plus, Sparkles, Zap } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { askGenai } from '@/lib/data'
import { useRouter } from 'next/navigation'
import GenaiThinking from '@/components/genai-thinking'

export default function InputCard() {

  const router = useRouter()

  const [question, setQuestion] = useState("")
  const [context, setContext] = useState("")
  const [options, setOptions] = useState<OptionData[]>([
    {id: getUUID(), name: '', pros: [''], cons: ['']},
    {id: getUUID(), name: '', pros: [''], cons: ['']},
  ])

  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const handleUpdateQuestion = (value: string) => {
    setQuestion(value);
  }

  const handleUpdateContext = (value: string) => {
    setContext(value);
  }

  const handleUpdateOption = (option: any) => {
    setOptions((prev) => prev.map((opt) => 
      opt.id === option.id ? {
        ...opt, 
        name: option.name,
        pros: option.pros,
        cons: option.cons,
      } : opt
    ))
  }

  const handleCardRemove = (id: any) => {
    if (options.length > 2) {
      setOptions((prev) => prev.filter((opt: any) => opt.id !== id))
    }
  }

  const addOption = () => {
    const newCard = {
      id: getUUID(),
      name: '',
      pros: [''],
      cons: ['']
    }
    setOptions((prev) => [...prev, newCard])
  }

  const isValid = useMemo(() => {
    if (!question.trim() || !context.trim()) return false;
    if (!Array.isArray(options) || options.length === 0) return false;

    for (const option of options) {
      if (!option.name.trim()) return false;
      if (!option.pros.every(p => p.trim() !== '')) return false;
      if (!option.cons.every(c => c.trim() !== '')) return false;
    }

    return true;
  }, [question, context, options])

  const analyzeData = async () => {
    setIsLoadingResponse(true);

    const fullData = {
      id: uuidv4(),
      question: question.trim(),
      context: context.trim(),
      options: options
    }
    console.log('Full Data:', fullData)
    let response = await askGenai(`
      Analyze this decision: "${fullData.question}"

      Additional Context: "${fullData.context}"

      Options:
      ${fullData.options.map(opt => {`
        ${opt.name}:
        Pros: ${opt.pros.join(', ')}
        Cons: ${opt.cons.join(', ')}
      `}).join('\n')}
    `);
    console.log("Response:", response)

    const decision = {
      prompt: fullData,
      response: response,
    }

    sessionStorage.setItem(`genai-response-${fullData.id}`, JSON.stringify(decision))
    
    router.push(`decision/${fullData.id}`)
  }

  return (
    <div>
      <GenaiThinking className="absolute min-h-screen inset-0 backdrop-brightness-50" isVisible={isLoadingResponse}/>
      <Card className="m-5 p-3 gap-8 sm:p-5">
        <div className='flex flex-row items-center gap-4'>
          <div className='w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex flex-row items-center justify-center'>
            <Zap className='w-6 h-6 text-white'/>
          </div>
          <div>
            <h1 className='text-2xl font-bold mb-1'>What's been on your mind?</h1>
            <p className='text-sm'>Share the main question that you need answered.</p>
          </div>
        </div>
        <div>
          <Input placeholder='What decision do you need to make?'
            onChange={(event) => handleUpdateQuestion(event.target.value)}
          />
        </div>
      </Card>
      <Card className='m-5 p-3 gap-8 sm:p-5'>
        <div className='flex flex-row gap-4'>
          <Sparkles className='w-7 h-7'/>
          <h1 className='text-xl font-semibold'>Additional Context</h1>
        </div>
        <Textarea placeholder="Share any constraints, priorities, or context that might influence this decision..."
          onChange={(event) => handleUpdateContext(event.target.value)}
        />
      </Card>
      <div>
        {options.map((opt: any, index: number) => {
          return (
            <OptionCard 
              key={opt.id}
              index={index}
              opt={opt} 
              multiple={options.length > 2} 
              removeCard={() => handleCardRemove(opt.id)} 
              onCardUpdate={(option: any) => handleUpdateOption(option)}
            />
          )
        })}
      </div>
      <div className='flex flex-row justify-center m-5 px-5 gap-8'>
        <Button variant="outline" size="sm" onClick={() => addOption()} className='hover:cursor-pointer'>
          <Plus/> Add Option
        </Button>
      </div>
      <div className='flex flex-row justify-center m-5 px-5 gap-8'>
        <Button type="button" variant="default" size="xl" onClick={() => analyzeData()} disabled={!isValid}>
          <Brain className='scale-125'/> Analyze
        </Button>
      </div>
    </div>
  )
}