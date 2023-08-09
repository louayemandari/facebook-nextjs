import cryptoJs from "crypto-js";

export async function encrypting(string, key, salts) {
  const encrypted = cryptoJs.AES.decrypt(string, key, salts);
  return encrypted
}
