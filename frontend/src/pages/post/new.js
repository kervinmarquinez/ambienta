// src/pages/post/new.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useModalStore from '@/store/useModalStore';

export default function NewPost() {
  const router = useRouter();
  const { openCreatePostModal } = useModalStore();

  useEffect(() => {
    // Abrir el modal y redirigir al dashboard
    openCreatePostModal();
    router.push('/dashboard');
  }, [router, openCreatePostModal]);

  return <div>Redirigiendo...</div>;
}