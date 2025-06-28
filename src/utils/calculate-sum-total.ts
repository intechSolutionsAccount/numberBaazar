
export function calculateSumTotal(number: string): { twoDigitSum: number; oneDigitSum: number } {
  // Remove any non-digit characters
  const cleanNumber = number.replace(/\D/g, '');
  
  if (cleanNumber.length === 0) return { twoDigitSum: 0, oneDigitSum: 0 };
  
  // Calculate the sum of all digits
  const totalSum = cleanNumber.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
  // If it's already a single digit, return it for both
  if (totalSum < 10) {
    return { twoDigitSum: totalSum, oneDigitSum: totalSum };
  }
  
  // If it's a two-digit number, calculate the final single digit
  const twoDigitSum = totalSum;
  const oneDigitSum = Math.floor(totalSum / 10) + (totalSum % 10);
  
  // If the one-digit sum is still two digits, reduce it further
  if (oneDigitSum >= 10) {
    const finalSum = Math.floor(oneDigitSum / 10) + (oneDigitSum % 10);
    return { twoDigitSum, oneDigitSum: finalSum };
  }
  
  return { twoDigitSum, oneDigitSum };
}
