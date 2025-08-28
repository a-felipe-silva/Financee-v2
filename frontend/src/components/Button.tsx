
interface ButtonProps {
    text: string;
    onClick?(): void; 
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <div className="bg-secondary hover:bg-secondary-hover flex items-center h-fit p-3 rounded-lg shadow-md/100 shadow-shadow transition-colors ease-in-out" onClick={onClick}>
          <p className="text-text-on-secondary font-serif">{ text }</p>      
    </div>
  )
}
