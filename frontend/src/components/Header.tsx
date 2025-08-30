import Button from "./Button";
import Export from "../assets/export.svg?react"

interface HeaderProps {
  onAddExpenseClick(): void;
}

export default function Header({ onAddExpenseClick }: HeaderProps) {
  return (
    <div className="w-full h-24 p-6 flex flex-row justify-between">
          <a href="#" className="font-primary font-bold text-primary-accent text-5xl">Financee</a>
          
          <div className="flex flex-row gap-6 items-center">
            <Export className="h-8 w-auto text-primary hover:text-primary-hover" />
            <Button text="Import Statement - AI" />
            <Button text="+ Add Expense" onClick={onAddExpenseClick}/>
          </div>
    </div>
  )
}
