/**
 * Calculates the check digit
 * @param dataCharacters - The data characters
 * @returns The check digit
 */
export function calculateCheckDigit(dataCharacters: number[]) {
  const sum = dataCharacters.reduce(
    (sum, dataCharacter, index) =>
      sum + dataCharacter * (index % 2 === 0 ? 1 : 3),
    0,
  );
  return (10 - (sum % 10)) % 10;
}

/**
 * Checks if the digits are valid
 * @param digits - The digits
 * @returns true if the digits are valid
 */
export default function checkDigits(digits: number[]): boolean {
  if (digits.length !== 13) {
    throw new Error("Invalid digits!");
  }
  const dataCharacters = digits.slice(0, 12);
  const checkDigit = digits[12];
  const calculatedCheckDigit = calculateCheckDigit(dataCharacters);
  return checkDigit === calculatedCheckDigit;
}
