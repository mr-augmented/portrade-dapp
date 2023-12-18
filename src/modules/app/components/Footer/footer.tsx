interface IFooterProps {
  children: React.ReactNode;
}

export default function Footer({ children }: IFooterProps): React.ReactNode {
  return <footer className='footer items-center p-4 bg-neutral text-neutral-content'>{children}</footer>;
}
