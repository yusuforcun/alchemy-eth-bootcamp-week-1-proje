import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex, hexToBytes } from "ethereum-cryptography/utils";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {

  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    try {
      const publicKey = secp256k1.getPublicKey(
        hexToBytes(privateKey)
      );

      const address = toHex(publicKey);

      setAddress(address);

      const {
        data: { balance },
      } = await server.get(`balance/${address}`);

      setBalance(balance);

    } catch (e) {
      setAddress("");
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type in a private Key"
          value={privateKey}
          onChange={onChange}
        />
      </label>

      <div>
        Address : {address.slice(0, 10)}...
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;