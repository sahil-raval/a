import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Re-fetch CMS content in the background at most every 30s so edits published
// in Sanity Studio show up on the live site without a redeploy.
export const revalidate = 30;

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
