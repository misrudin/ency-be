const jose = require("node-jose");
const moment = require("moment");
const dotenv = require("dotenv");

dotenv.config();

const expiryTime = moment().add(1, "day").unix();
const secretKey = process.env.SECRET_KEY;

module.exports = {
  async generateJWT(data) {
    const keystore = jose.JWK.createKeyStore();
    const payload = {
      ...data,
      exp: expiryTime,
    };

    // Membuat kunci rahasia menggunakan kata kunci
    await keystore.generate(
      "oct",
      256,
      { use: "sig", alg: "HS256" },
      true,
      ["sign"],
      { k: secretKey }
    );

    // Membuat JWT menggunakan kunci rahasia
    const token = await jose.JWS.createSign(
      { alg: "HS256", format: "compact" },
      keystore
    )
      .update(JSON.stringify(payload), "utf8")
      .final();

    return token;
  },

  async verifyJWT() {
    const keystore = jose.JWK.createKeyStore();

    // Membuat kunci rahasia menggunakan kata kunci
    await keystore.generate('oct', 256, { use: 'sig', alg: 'HS256' }, true, ['verify'], { k: secretKey });

    try {
      const result = await jose.JWS.createVerify(keystore)
        .verify(token);

      // JWT berhasil diverifikasi
      console.log('JWT valid:', result);

      // Mengekstrak payload dari JWT
      const payload = JSON.parse(result.payload.toString());
      console.log('Payload:', payload);
    } catch (error) {
      // JWT tidak valid
      console.error('JWT tidak valid:', error);
    }
  }
};
