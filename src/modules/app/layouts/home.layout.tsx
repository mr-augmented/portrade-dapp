import Navbar from '../components/Navbar/navbar';

interface IHomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: IHomeLayoutProps) {
  return (
    <main className='flex bg-slate-50 text-gray-900 min-h-screen w-full flex-col items-center justify-end'>
      <Navbar />
      {children}
    </main>
  );
}
