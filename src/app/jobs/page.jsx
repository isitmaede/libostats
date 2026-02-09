"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  Search,
  TrendingUp,
  MapPin,
  BadgeDollarSign,
  Activity,
  BarChart3,
  PieChart as PieIcon,
  LayoutDashboard,
  ArrowUpRight,
} from "lucide-react";

import MainHeader from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";

const MetricCard = ({ label, value, sub, icon: Icon, color }) => (
  <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between mb-6">
      <div
        className={`p-4 rounded-2xl ${color} bg-opacity-10 transition-transform hover:scale-110`}
      >
        <Icon size={24} className={color.replace("bg-", "text-")} />
      </div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">
        مباشر
      </span>
    </div>
    <p className="text-slate-500 font-bold text-sm mb-1">{label}</p>
    <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
      {value}
    </h3>
    <p className="text-xs text-slate-400 font-medium">{sub}</p>
  </div>
);

export default function FinalStatisticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searchCount, setSearchCount] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);


  const cleanInsights = useMemo(() => {
    if (!data?.marketInsights) return [];
    return data.marketInsights
      .filter((item) => item.avgSalary < 50000 && item.avgSalary > 0) 
      .map((item) => ({
        ...item,
        category:
          item.category === "Organization"
            ? "جهات عامة / منظمات"
            : item.category.includes("Administrative")
              ? "خدمات إدارية"
              : item.category.includes("Medical")
                ? "مندوب طبي"
                : item.category,
      }))
      .sort((a, b) => b.count - a.count);
  }, [data]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-bold text-slate-400 animate-pulse">
        جاري استخراج البيانات...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]" dir="rtl">
      <MainHeader />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <LayoutDashboard className="text-blue-600" size={20} />
            <span className="text-sm font-black text-blue-600 tracking-widest">
              لوحة البيانات
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            نبض سوق العمل
          </h1>
          <p className="text-slate-500 font-bold text-lg italic">
            بيانات حقيقية من أرض الواقع لمساعدتك في اتخاذ قرارك المهني.
          </p>
        </header>

        
        <section className="mb-12">
          <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-slate-200 flex items-center gap-4 transition-all focus-within:border-blue-400">
            <div className="mr-6 p-3 bg-slate-50 rounded-2xl text-slate-400 group-focus-within:text-blue-600">
              <Search size={22} />
            </div>
            <input
              type="text"
              placeholder="ابحث عن مسمى وظيفي محدد..."
              className="flex-grow bg-transparent border-none outline-none text-xl font-bold py-4 placeholder:text-slate-300"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </section>

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <MetricCard
            icon={TrendingUp}
            label="الأكثر طلباً"
            value={data?.trendingTitles[0]?.title || "تحميل..."}
            sub="بناءً على نشاط الإعلانات"
            color="bg-blue-500"
          />
          <MetricCard
            icon={MapPin}
            label="المدينة النشطة"
            value={data?.locations[0]?.name || "تحميل..."}
            sub="كثافة فرص العمل"
            color="bg-emerald-500"
          />
          <MetricCard
            icon={BadgeDollarSign}
            label="متوسط الأجور"
            value={`${data?.overview?.avgMinSalary?.toLocaleString()} د.ل`}
            sub="الحد الأدنى المتوقع بالسوق"
            color="bg-amber-500"
          />
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200">
            <div className="flex items-center gap-3 mb-10 text-blue-600 font-black">
              <BarChart3 size={20} /> <h3>المسميات الأكثر تكراراً</h3>
            </div>
            <div className="space-y-8">
              {data?.trendingTitles.slice(0, 6).map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between mb-2 font-bold text-slate-700">
                    <span>{item.title}</span>
                    <span className="text-blue-600">{item.count}</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{
                        width: `${(item.count / data.trendingTitles[0].count) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-10 w-full text-emerald-600 font-black">
              <PieIcon size={20} /> <h3>التوزيع حسب المدن</h3>
            </div>
            <div className="h-[250px] w-full" style={{ direction: "ltr" }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data?.locations.slice(0, 5)}
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="count"
                    paddingAngle={5}
                  >
                    {data?.locations.map((_, i) => (
                      <Cell
                        key={i}
                        fill={
                          [
                            "#2563eb",
                            "#10b981",
                            "#f59e0b",
                            "#6366f1",
                            "#94a3b8",
                          ][i % 5]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-6">
              {data?.locations.slice(0, 4).map((loc, i) => (
                <div
                  key={i}
                  className="flex justify-between p-3 bg-slate-50 rounded-xl font-bold text-xs"
                >
                  <span>{loc.name}</span>
                  <span className="text-slate-400">
                    {Math.round((loc.count / data.overview.totalJobs) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3 font-black">
            <Activity size={20} /> <h3>تحليل القطاعات</h3>
          </div>
          <table className="w-full text-right">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                <th className="py-6 px-10">القطاع</th>
                <th className="py-6 px-10 text-center">عدد الإعلانات</th>
                <th className="py-6 px-10">متوسط الراتب</th>
                <th className="py-6 px-10 text-left">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {cleanInsights.map((insight, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50/30 transition-colors border-b border-slate-50 last:border-0"
                >
                  <td className="py-8 px-10 font-black text-slate-800">
                    {insight.category}
                  </td>
                  <td className="py-8 px-10 text-center font-bold text-slate-400">
                    {insight.count}
                  </td>
                  <td className="py-8 px-10 font-black text-blue-600">
                    {insight.avgSalary.toLocaleString()} د.ل
                  </td>
                  <td className="py-8 px-10 text-left">
                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400 italic">
                      مستقر
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
