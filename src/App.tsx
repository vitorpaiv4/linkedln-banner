import React from "react";
import { BannerForm } from "./components/BannerForm";
import { BannerPreview } from "./components/BannerPreview";
import { BannerProvider } from "./context/BannerContext";

function App() {
  return (
    <BannerProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Criador de Banner LinkedIn</h1>
          
          <div className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <BannerForm />
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <BannerPreview />
            </div>
          </div>
        </div>
      </div>
    </BannerProvider>
  );
}

export default App;
