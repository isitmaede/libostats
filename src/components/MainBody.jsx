import React from "react";
import { ArrowDown, Globe, BarChart2, ShieldCheck, Zap } from "lucide-react";

export default function MainBody() {
  return (
    <div className="bg-white text-black selection:bg-blue-600 selection:text-white">
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 border-b border-black/5">
        <div className="max-w-7xl mx-auto w-full">
          <div className="overflow-hidden">
            <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic">
              Unlocking <br />
              <span className="text-blue-600">Libyan</span> Data.
            </h1>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-5">
              <p className="text-xl md:text-2xl font-medium leading-tight tracking-tight text-gray-400">
                منصة LiboStats ليست مجرد موقع توظيف تقليدي. نحن نراقب، نحلل،
                ونرسم خارطة الطريق لمستقبلك المهني في السوق الليبي.
              </p>
            </div>
            <div className="md:col-span-7 flex justify-end">
              <div className="flex flex-col items-end gap-4">
                <div className="w-24 h-24 border border-black rounded-full flex items-center justify-center animate-bounce">
                  <ArrowDown size={32} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400">
                  Scroll to Explore
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h2 className="text-xs uppercase font-black tracking-[0.5em] text-blue-600 mb-8">
              Concept // الرؤية
            </h2>
            <p className="text-4xl md:text-5xl font-bold leading-none tracking-tighter uppercase">
              نحول الضجيج <br /> إلى بيانات <br /> قابلة للتنفيذ.
            </p>
          </div>
          <div className="flex flex-col justify-end space-y-8">
            <p className="text-lg text-gray-600 leading-relaxed italic border-r-2 border-black pr-6">
              "في سوق عمل يتسم بالتغير السريع، تصبح المعلومة هي العملة الأغلى.
              LiboStats يسحب آلاف البيانات يومياً ليقدم لك الخلاصة التي تحتاجها
              لاتخاذ قرارك القادم."
            </p>
            <div className="h-[1px] w-full bg-black/10"></div>
            <div className="flex gap-12">
              <div>
                <h4 className="text-2xl font-black">178+</h4>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                  Pages Analyzed
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-black">24/7</h4>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                  Live Monitoring
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[15vw] font-black opacity-5 absolute left-0 leading-none select-none pointer-events-none">
            STRATEGY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            <PillarItem
              icon={<Zap size={24} />}
              title="رصد ذكي"
              desc="تقنيات سحب بيانات متطورة تضمن شمولية العرض من كافة المنصات الليبية."
            />
            <PillarItem
              icon={<BarChart2 size={24} />}
              title="تحليل رقمي"
              desc="تحويل الوصف الوظيفي المعقد إلى نسب مئوية وإحصائيات سهلة القراءة."
            />
            <PillarItem
              icon={<ShieldCheck size={24} />}
              title="دقة متناهية"
              desc="تصفية الوظائف الوهمية والمكررة لنقدم لك فقط ما يستحق وقتك وجهدك."
            />
          </div>
        </div>
      </section>

      <section className="py-40 px-6 text-center border-b border-black/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Ready to see <br /> the{" "}
            <span className="text-blue-600 underline decoration-4 underline-offset-8">
              Statistics?
            </span>
          </h3>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">
            انتقل الآن إلى لوحة التحكم واستكشف اتجاهات سوق العمل الليبي لعام
            2026.
          </p>
          <button className="group relative bg-black text-white px-12 py-6 text-sm font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:pr-16">
            <span className="relative z-10">استكشف الوظائف الآن</span>
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <ArrowDown className="-rotate-90" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

function PillarItem({ icon, title, desc }) {
  return (
    <div className="p-12 border border-white/10 hover:bg-white/5 transition-colors duration-500 group">
      <div className="mb-8 text-blue-500 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 uppercase italic tracking-tighter">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
