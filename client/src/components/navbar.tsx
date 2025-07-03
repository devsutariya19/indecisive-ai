'use client'

import { ArrowRight, BrainCircuit, Menu, X } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { getHealth } from '@/lib/data';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [healthStatus, setHealthStatus] = useState('Offline');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 25);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    const getHealthStatus = async () => {
      await getHealth().then((health: any) => {
        setHealthStatus(health.health)
      }).catch((err: any) => {
        setHealthStatus(err.health)
      });
    }
    
    getHealthStatus()
  }, [])
  
  const getHealthColor = () => {
    if (healthStatus == 'Online') {
      return {
        bg: 'bg-emerald-300',
        text: 'text-emerald-400',
        border_bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/10'
      };
    } else {
      return {
        bg: 'bg-red-300',
        text: 'text-red-400',
        border_bg: 'bg-red-500/10',
        border: 'border-red-500/10'
      };
    }
  }
  const statusClass = getHealthColor();

  return (
    <div>
      <nav className={`fixed top-1 left-0 right-0 lg:mx-15 mx-5 z-50 transition-all duration-500 ease-out ${isScrolled ? 'py-2' : 'py-6'}`}>
        <div className={`max-w-6-xl mx-auto transition-all duration-500 ease-out ${
          isScrolled ? 'bg-cyan-900/20 backdrop-blur-xl border-0 rounded-2xl px-6 py-3 shadow-2xl shadow-emerald-500/10 ring-1 ring-cyan-800/50' 
            : 'bg-transparent border-0 p-0'
          }`}>
          
          <div className='flex flex-row items-center'>
            
            <div className='flex flex-1 justify-start'>
              <Link href="/">
                <div className='flex flex-row items-center gap-4'>
                  <div className='w-8 h-8 bg-gradient-to-br from-emerald-600 dark:from-emerald-500 to-blue-700 rounded-md flex flex-row items-center justify-center'>
                    <BrainCircuit className='w-5 h-5 text-white'/>
                  </div>
                  <div className="flex flex-col">
                    <div className='text-2xl font-bold'>IndecisiveAI</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className='hidden md:flex md:flex-1 item-center justify-center'>
              {/* <Link href="/new" className=" text-slate-300 hover:text-emerald-300 transition-colors duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span>New Decision</span>
              </Link> */}
            </div>

            <div className='md:flex md:flex-1 justify-end gap-3'>
              <Button type="button" variant="default" size="sm" className="md:flex sm:hidden hidden bg-gradient-to-b from-cyan-200 to-blue-200/95 shadow-indigo-500/10">
                Get Started
                <ArrowRight className='scale-95'/> 
              </Button>
              <div className={`md:flex sm:hidden hidden items-center px-3 py-1 ${statusClass.border_bg} border ${statusClass.border} rounded-full`}>
                <div className={`w-2 h-2 ${statusClass.bg} rounded-full mr-2 animate-pulse`}></div>
                <span className={`text-xs ${statusClass.text} font-medium`}>{healthStatus}</span>
              </div>
            </div>
            
            <Button type="button" variant="secondary" size="icon" className='md:hidden text-white hover:text-cyan-200 transition-colors duration-300 bg-transparent hover:bg-transparent'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className='scale-150'/> : <Menu className='scale-150'/>}
            </Button>

          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 pb-1 rounded-b-2xl border-t border-slate-700 animate-in slide-in-from-top-2 duration-500">
              <div className="flex flex-row justify-between">
                <Link href="/new" className="flex flex-row text-center text-slate-300 hover:text-emerald-300 transition-colors duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  New Decision
                  <ArrowRight className='scale-75'/> 
                </Link>
                <div className={`flex items-center px-3 py-1 ${statusClass.border_bg} border ${statusClass.border} rounded-full`}>
                  <div className={`w-2 h-2 ${statusClass.bg} rounded-full mr-2 animate-pulse`}></div>
                  <span className={`text-xs ${statusClass.text} font-medium`}>{healthStatus}</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </nav>
    </div>
  )
}
