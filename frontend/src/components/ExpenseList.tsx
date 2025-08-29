import ExpenseCard from "./ExpenseCard";


export default function ExpenseList() {
  return (
    <div className='mx-auto my-6 flex flex-col gap-4 max-w-[1000px]'>
        <ExpenseCard/>
        <ExpenseCard/>
        <ExpenseCard/>
        <ExpenseCard/>
        <ExpenseCard/>
        <ExpenseCard/>
        <ExpenseCard/>
        <ExpenseCard/>
    </div>
  )
}
