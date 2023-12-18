interface IHeroProps {
  children: React.ReactNode;
}

export default function Hero({ children }: IHeroProps): React.ReactNode {
  return (
    <div className='hero min-h-screen'>
      <div className='hero-content'>{children}</div>
    </div>
  );
}
