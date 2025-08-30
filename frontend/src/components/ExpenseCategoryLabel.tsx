interface ExpenseCategoryLabelProps {
  category: {
    id: number;
    name: string;
  };
}

export default function ExpenseCategoryLabel({ category }: ExpenseCategoryLabelProps) {
  return (
    <div category-id={category.id} className="bg-primary-accent text-text-on-primary text-center h-fit py-1 px-4 rounded-lg">{ category.name }</div>
  )
}
