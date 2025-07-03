import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCog, LaptopMinimalCheck, MessageCircleQuestion, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 pb-20">
      <div className="flex flex-col gap-20">
        <section className="flex flex-col items-center gap-12">
          <div className="flex items-center ml-4 px-3 py-2 gap-3 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <Zap className="w-5 h-5 text-amber-200"/>
            <span className="text-md text-emerald-100 font-medium">Powered by Google Gemini AI</span>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <span className="md:text-6xl text-5xl font-medium">
              Stop 
              <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent md:text-7xl text-6xl font-bold">
                Overthinking
              </span>
            </span>
            <span className="text-lg font-normal text-center">
              Get AI-powered recommendations in seconds. Input your options, get clear guidance.
            </span>
          </div>

          <Link href="/new">
            <div className='flex flex-row justify-center m-5 px-5 gap-8'>
              <Button type="button" variant="default" size="xxl" className="bg-gradient-to-b from-cyan-200 to-blue-200/95 shadow-indigo-500/10">
                Make Your First Decision
                <ArrowRight className='scale-125'/> 
              </Button>
            </div>
          </Link>
        </section>

        <section className="flex flex-col gap-15 items-center justify-center p-15 bg-gradient-to-br from-teal-900/10 to-emerald-900/5 rounded-2xl border border-indigo-500/20">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="md:text-4xl text-3xl font-bold">How It Works</span>
            <span className="text-lg text-slate-400">
              Three simple steps to get AI-powered decision recommendations
            </span>
          </div>

          <div className="flex flex-col items-center text-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-b from-emerald-700 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
              <MessageCircleQuestion className="w-10 h-10"/>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Define Your Decision</h3>
            <p className="text-slate-300 leading-relaxed">
              Enter your question, provide context, and list your available options with their pros and cons.
            </p>
          </div>

          <div className="flex flex-col items-center text-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-b from-emerald-700 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
              <BrainCog className="w-10 h-10"/>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">AI Analysis</h3>
            <p className="text-slate-300 leading-relaxed">
              Our system processes your input through Google Gemini for comprehensive analysis and scoring.
            </p>
          </div>

          <div className="flex flex-col items-center text-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-b from-emerald-700 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
              <LaptopMinimalCheck className="w-10 h-10"/>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Get Recommendations</h3>
            <p className="text-slate-300 leading-relaxed">
              Receive detailed analysis, rankings, and clear recommendations to make your best decision.
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="md:text-4xl text-3xl font-bold">Ready to Decide?</span>
            <span className="text-lg text-slate-400">
              Stop second-guessing yourself. Get AI guidance now.
            </span>
          </div>
          <Link href="/new">
            <div className='flex flex-row justify-center m-5 px-5 gap-8'>
              <Button type="button" variant="default" size="lg" className="bg-gradient-to-b from-cyan-200 to-blue-200/95 shadow-indigo-500/10">
                Get Started
                <ArrowRight className='scale-125'/> 
              </Button>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
