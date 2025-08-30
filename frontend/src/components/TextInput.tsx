
interface InputProps {
  id?: string;
  label: string;
  placeholder?: string;
  value?: string;
}

export default function TextInput({ id, label, placeholder, value }: InputProps) {
  return (
    <div className="flex flex-col gap-2.5 text-base">
          <label htmlFor={id} className="text-2xl text-text font-serif">{ label }</label>
          <input type="text" id={id} placeholder={placeholder} value={value} className="bg-background outline-none px-2 py-1 border-border text-2xl focus-visible:border-border-selected focus:border-border-selected border-3 rounded-sm placeholder:text-text-muted text-text font-sans" />
    </div>
  )
}
