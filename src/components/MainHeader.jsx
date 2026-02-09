'use client'
import { useRouter } from "next/navigation";
import React from "react";

export default function MainHeader() {
  const router = useRouter()
  const clicko = () => {
    router.push('/jobs')
  }
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tighter uppercase italic">
          Libo<span className="text-blue-600">Stats.</span>
        </div>

        <nav className="hidden md:flex gap-10 text-sm font-medium tracking-widest uppercase">
          <a href="/" className="hover:text-blue-600 transition">
            الرئيسية
          </a>
          <a href="/jobs" className="hover:text-blue-600 transition">
            الإحصائيات
          </a>
          <a href="https://libyanjobs.ly/jobs" className="hover:text-blue-600 transition">
            سوق العمل
          </a>
        </nav>

        <button onClick={clicko} className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition duration-500">
          دليل التوظيف
        </button>
      </div>
    </header>
  );
}
