import { Geist, Geist_Mono, Readex_Pro } from "next/font/google";
import "./globals.css";

const Read = Readex_Pro({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "LiboStats | نبض سوق العمل الليبي",
  description:
    "أول منصة إحصائية لتحليل سوق العمل في ليبيا. اكتشف الوظائف الأكثر طلباً، متوسط الرواتب، وتوزيع الفرص في طرابلس وبنغازي ومصراتة.",
  keywords: [
    "وظائف ليبيا",
    "توظيف طرابلس",
    "سوق العمل الليبي",
    "Libya Jobs",
    "إحصائيات توظيف",
  ],
  openGraph: {
    title: "LiboStats - إحصائيات سوق العمل الليبي",
    description: "تعرف على الوظائف الأكثر طلباً في مدينتك بالأرقام.",
    type: "website",
    locale: "ar_LY",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${Read.className}`}>{children}</body>
    </html>
  );
}
