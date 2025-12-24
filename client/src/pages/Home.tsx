import React from 'react';
import { AppProvider } from '@/lib/store';
import { Sidebar } from '@/components/Sidebar';
import { ToolDetails } from '@/components/ToolDetails';

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <ToolDetails />
      </main>
    </div>
  );
}
