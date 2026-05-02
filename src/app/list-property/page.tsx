"use client";

import { ListProperty } from '@/components/ListProperty';
import { useRouter } from 'next/navigation';

export default function ListPropertyPage() {
  const router = useRouter();

  return (
    <ListProperty onSuccess={() => {
      router.push('/explore');
    }} />
  );
}
