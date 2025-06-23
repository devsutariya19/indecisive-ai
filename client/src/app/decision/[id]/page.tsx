'use client'

import ConfidenceChart from '@/components/confidence-chart'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { GenaiResponse } from '@/types/GenaiResponse'
import { Option, UserPrompt } from '@/types/UserPrompt'
import { Circle, CircleCheckBig, Dot, MessageCircleQuestion, Plus, TriangleAlert } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RadialBar, RadialBarChart } from 'recharts'

export default function DecisionResults() {
  const {id} = useParams()

  const [prompt, setPrompt] = useState<UserPrompt>()
  const [response, setResponse] = useState<GenaiResponse>()

  useEffect(() => {
    if (!id) return;

    const genaiResponse: any = sessionStorage.getItem(`genai-response-${id}`)
    if (genaiResponse) {
      setPrompt(JSON.parse(genaiResponse).prompt)
      setResponse(JSON.parse(genaiResponse).response.result)
    }

  }, [id])

  return (
    <div>
      <Card className="m-5 px-5 py-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="prompt">
            <AccordionTrigger className='items-center'>
              <div className='flex flex-row gap-5 items-center'>
                <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex flex-row items-center justify-center'>
                  <MessageCircleQuestion className='w-7 h-7 text-white'/>
                </div>
                <div className='flex flex-col text-left'>
                  <h3 className='text-2xl font-bold text-white'>Original Question & Choices</h3>
                  <p className='text-slate-400'>View the complete analysis breakdown</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='border-t border-slate-700/50 mt-2'>
                <Card className='p-5 my-5'>
                  <span className='font-bold text-xl text-left'>{prompt?.question}</span>
                </Card>
                
                <Card className='p-5 my-5'>
                  <div className='flex flex-row gap-2 items-center'>
                    <Circle className='w-3 h-3 mx-0.5 text-indigo-500 bg-indigo-500 rounded-full'/>
                    <span className='text-lg font-bold'>Context</span>
                  </div>
                  <span className='text-left'>{prompt?.context}</span>
                </Card>
                
                <div className='flex flex-col gap-6'>
                  {prompt?.options.map((option: Option) => {
                    return (
                      <Card key={`r-${option.id}`} className='p-5 gap-3'>
                        <div className='flex flex-row gap-2 items-center'>
                          <Circle className='w-3 h-3 mx-0.5 bg-blue-800 dark:bg-blue-500 text-blue-500 rounded-full'/>
                          <span className='font-bold text-lg'>{option.name}</span>
                        </div>

                        <div>
                          <div className='flex flex-row gap-2 items-center my-2 text-emerald-300'>
                            <Plus className='w-4 h-4'/>
                            <span className='font-bold'>Pros</span>
                          </div> 
                          {option.pros.map((pro: string, index: number) => {
                            return (
                              <span key={`rp-${index}`} className='flex flex-row gap px-3'><Dot/> {pro}</span>
                            )
                          })}
                        </div>

                        <div>
                          <div className='flex flex-row gap-2 items-center my-2 text-red-400'>
                            <Plus className='w-4 h-4'/>
                            <span className='font-bold'>Cons</span>
                          </div> 
                          {option.cons.map((con: string, index: number) => {
                            return (
                              <span key={`rc-${index}`} className='flex flex-row gap px-3'><Dot/> {con}</span>
                            )
                          })}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      
      <div className='m-5 px-5 flex flex-col items-center justify-center gap-3'>
        <span className='text-xl font-bold text-slate-400'>Your Question</span>
        <span className='font-bold text-3xl text-center'>{prompt?.question}</span>
      </div>

      <Card className='m-5 px-5'>
        <div className='flex justify-center'>
          <span className='text-bold text-2xl'>Recommended Decision</span>
        </div>

        <ConfidenceChart confidence={response?.confidence}/>

        <Card className='p-5'>
          <div className='flex justify-center'>
            <span className='font-extrabold text-2xl'>{response?.recommended_choice}</span>
          </div>
        </Card>
      </Card>

      <Card className='m-5 px-5'>
        <div className='flex flex-row gap-5 items-center'>
          <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-600 rounded-lg flex flex-row items-center justify-center'>
            <CircleCheckBig className='w-7 h-7 text-white'/>
          </div>
          <div className='flex flex-col text-left'>
            <h3 className='text-2xl font-bold text-white'>Why This Makes Sense</h3>
          </div>
        </div>

        <div className='border-l-4 rounded-l-md border-green-500 px-4'>
          <span>{response?.reason_for}</span>
        </div>
      </Card>

      <Card className='m-5 px-5'>
        <div className='flex flex-row gap-5 items-center'>
          <div className='w-12 h-12 bg-gradient-to-br from-amber-500 to-red-600 rounded-lg flex flex-row items-center justify-center'>
            <TriangleAlert className='w-7 h-7 text-white'/>
          </div>
          <div className='flex flex-col text-left'>
            <h3 className='text-2xl font-bold text-white'>Things to Consider</h3>
          </div>
        </div>

        <div className='border-l-4 rounded-l-md border-amber-500 px-4'>
          <span>{response?.reason_against}</span>
        </div>
      </Card>

      <Card className='m-5 px-5'>
        <div className='flex flex-col justify-center item-center text-center gap-5'>
          <div className='flex flex-col'>
            <span className='font-extrabold text-2xl'>Ready to decide?</span>
            <span className='text-slate-400'>Trust the analysis, but remember your intuition matters too.</span>
          </div>
          <a href="/">
            <div className='flex flex-row justify-center'>
              <Button type="button" variant="default" size="lg">
                <Plus className='scale-110'/> New Question
              </Button>
            </div>
          </a>
        </div>
      </Card>

      <div className='m-5 px-10 flex items-center justify-center text-center'>
        <span className='text-slate-400 text-sm'>
          AI recommendations are based on data analysis. Your personal values, circumstances, and intuition are equally important in making the right choice for you.
        </span>
      </div>

    </div>
  )
}
