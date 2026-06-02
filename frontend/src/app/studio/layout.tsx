/**
 * The Studio uses its own root layout (without the main site Navigation/Footer).
 */
export const metadata = {
  title: "APM Energy CMS",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
