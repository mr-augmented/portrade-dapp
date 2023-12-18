interface IMintButtonProps {
  onClick: () => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
}

export default function MintButton({ onClick, disabled, label = 'Mint', isLoading = false }: IMintButtonProps) {
  return (
    <button onClick={async () => onClick()} disabled={disabled || false} className='btn btn-primary'>
      {label}
      {isLoading && <span className='loading loading-spinner'></span>}
    </button>
  );
}
