interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 font-sans hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full"
    >
      {children}
    </button>
  );
}
