import ExpenseCategoryLabel from "./ExpenseCategoryLabel"
import IconButton from "./IconButton"
import EditCardIcon from "../assets/edit-card.svg?react"
import DeleteCardIcon from "../assets/delete-card.svg?react"


export default function ExpenseCard() {
  return (
    <div className="bg-surface border-3 border-border p-4 flex flex-row justify-between gap-6 shadow-md shadow-shadow rounded-lg">
        <div className="flex flex-row justify-between items-center grow-1">
            <ExpenseCategoryLabel />
            <p className="font-primary">Expense Description</p>
            <div className="flex flex-col items-center">
              <p className="font-primary text-2xl">R$40.20</p>
              <p className="font-primary text-xs">20-05-2025</p>
            </div>      
        </div>
        <div className="flex flex-col gap-1">
            <IconButton Icon={EditCardIcon} />
            <IconButton Icon={DeleteCardIcon} type="error" />
        </div>
    </div>
  )
}
