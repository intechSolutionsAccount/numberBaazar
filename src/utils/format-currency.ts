
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount);
}
