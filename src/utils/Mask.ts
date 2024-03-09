export const maskEmail = (email: string): string => {
  // Split the email address into address and domain
  const [address, domain] = email.split('@')

  // Determine the length of the address
  const addressLength = address.length

  // Calculate the number of characters to mask
  const maskLength = Math.floor(addressLength / 2)

  // Generate the masked address
  const maskedAddress =
    address.substring(0, addressLength - maskLength) + '*'.repeat(maskLength)

  // Combine the masked address with the domain
  const maskedEmail = maskedAddress + '@' + domain

  return maskedEmail
}
