import cryptoJs from "crypto-js";

export async function decrypting(string, key, salts) {
  const decrypted = cryptoJs.AES.decrypt(string, key, salts);
  return decrypted
}
