'use client'
import React from 'react';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';

export default function MainFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t-2 border-black pt-20 pb-10 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
        
          <div className="md:col-span-6">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic">
              Libo<span className="text-blue-600">Stats.</span>
            </h2>
            <p className="text-gray-400 max-w-sm font-medium leading-tight italic">
              البيانات هي النفط الجديد، ونحن هنا لنقوم بعملية التكرير. نراقب سوق العمل الليبي لنمنحك الرؤية الكاملة.
            </p>
          </div>

         
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.4em] text-blue-600 mb-8 underline decoration-2 underline-offset-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-black uppercase tracking-widest">
              <li><a href="/" className="hover:line-through transition">الرئيسية</a></li>
              <li><a href="/jobs" className="hover:line-through transition">الإحصائيات</a></li>
              <li><a href="/about" className="hover:line-through transition">عن المشروع</a></li>
              <li><a href="mailto:info@libostats.ly" className="hover:line-through transition italic lowercase">Contact.us</a></li>
            </ul>
          </div>

        
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.4em] text-blue-600 mb-8 underline decoration-2 underline-offset-8">Social Connect</h4>
            <div className="flex gap-6">
              <a href="https://github.com/isitmaede/libostats" className="hover:scale-125 transition duration-500"><Github size={20} /></a>
              <a href="https://www.linkedin.com/in/mohammedyounusdev" className="hover:scale-125 transition duration-500"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

       
        <div className="relative h-20 md:h-40 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <span className="text-[15vw] font-black uppercase tracking-tighter whitespace-nowrap">
            Libyan Job Market Intelligence
          </span>
        </div>

       
        <div className="mt-10 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            © 2026 LiboStats Project — All Data Scraped Locally
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition"
          >
            Back to Top 
            <div className="w-8 h-8 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition duration-500">
              <ArrowUpRight size={14} className="-rotate-45" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}