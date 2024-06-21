import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <Link href={'/departments/create'}>Dodaj Dział</Link>
      <Link href={'/projects/create'}>Dodaj Projekt</Link>
      <Link href={'/employees/create'}>Dodaj Pracownika</Link>
      <Link href={'/tasks/create'}>Dodaj Zadanie</Link>
    </main>
  );
}
