import { redirect } from 'next/navigation';

export default function Page() {
  // Aqui você verificaria se o usuário está autenticado
  // Por enquanto, vamos sempre redirecionar para o login
  redirect('/login');
} 