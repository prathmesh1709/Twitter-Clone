import FollowBar from "@/components/FollowBar";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-black min-h-screen">
      {/* Container */}
      <div className="container mx-auto xl:px-30 max-w-6xl">
        {/* Grid of 4 Columns */}
        <div className="grid grid-cols-4">
          <Sidebar />
          {/* Actual Content */}
          <div className="col-span-3 lg:col-span-2 border-x border-neutral-800">
            <div className="h-full">
              {children}
              <Footer />
            </div>
          </div>
          {/* Desktop Only - Follow Bar */}
          <FollowBar />
        </div>
      </div>
    </div>
  );
}
