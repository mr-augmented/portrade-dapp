import GoHome from '../GoHome/goHome';
import Wallet from '../Wallet/wallet';

export default function Navbar() {
  return (
    <div className='navbar absolute mt-4 px-4 md:px-8 top-0 h-12'>
      <div className='flex-1'>
        <GoHome />
      </div>
      <div className='flex-none'>
        <Wallet />
      </div>
    </div>
  );
}
