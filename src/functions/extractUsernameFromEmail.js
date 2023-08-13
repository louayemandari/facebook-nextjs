export function extractUsernameFromEmail(email) {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.slice(0, atIndex);
    }
    return email; // Return the whole email if no "@" found
  }
  
