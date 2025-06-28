
export function calculateLuckyNumber(number: string): number {
  // Remove any non-digit characters
  const cleanNumber = number.replace(/\D/g, '');
  
  if (cleanNumber.length === 0) return 0;
  
  // If it's already a single digit, return it
  if (cleanNumber.length === 1) {
    return parseInt(cleanNumber);
  }
  
  // Add all digits
  const sum = cleanNumber.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
  // Recursively call until we get a single digit
  if (sum > 9) {
    return calculateLuckyNumber(sum.toString());
  }
  
  return sum;
}
