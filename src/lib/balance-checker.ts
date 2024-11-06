// Utility function to check if user balance meets the required threshold
export const hasEnoughBalance = (balance: string, xAmount: string): boolean => {
    const numericBalance = parseFloat(balance); // Convert balance to a number
    const numericXamount = parseFloat(xAmount)
    const requiredAmount = numericXamount * 1.5;
    return numericBalance >= requiredAmount;
  }