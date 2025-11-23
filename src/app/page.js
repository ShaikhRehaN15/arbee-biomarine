// app/page.js
import Herobgvideo from '@/components/Hero/Herobgvideo';
import Subsidariesbar from "@/components/Hero/Subsidariesbar";
import AboutCare from '../components/about/about';
import Enquiry from '../components/enquiry/enquiry';
import Financials from '../components/financials/financials';
import Commitment from '../components/commitment/committment';
import AdminAccessModal from '../components/AdminAccessModal';

export default function Home() {
  return (
    <>
      {/* Admin Modal */}
      <AdminAccessModal />

      {/* Hero Section - Full viewport height */}
      <section className="relative w-full h-[100dvh] overflow-hidden">
        <Herobgvideo />
        <div className="absolute bottom-0 left-0 w-full z-10">
          <Subsidariesbar />
        </div>
      </section>

      {/* About Section */}
<section id="about">
  <AboutCare />
</section>

{/* Initiatives Section */}
<section id="initiatives">
  <Commitment />
</section>

{/* Financial Reports Section */}
<section id="financials">
  <Financials />
</section>

{/* enquiry Section */}
<section id="enquiry">
  <Enquiry/>
</section>

    </>
  );
}
