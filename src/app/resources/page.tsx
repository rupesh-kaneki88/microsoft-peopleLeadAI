'use client';

import React from 'react';
import PopularContent from '@/components/PopularContent';

const ResourcesPage: React.FC = () => {
  return (
    <main className="bg-[var(--color-background)] text-[var(--color-secondary)] overflow-x-hidden">
      <PopularContent />
    </main>
  );
};

export default ResourcesPage;