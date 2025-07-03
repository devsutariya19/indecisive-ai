import { Brain } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <>
      <div className="lg:mx-26 md:mx-17 mx-7 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                IndecisiveAI
              </span>
            </div>
            <p className="text-slate-400 max-w-md">
              Empowering better decisions through AI-powered analysis. Make confident choices with intelligent recommendations tailored to your unique situation.
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-700/50 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 IndecisiveAI. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}
