import * as dotenv from "dotenv";

dotenv.config();

// export const firebaseConfig = {
//   type: "service_account",
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.PRIVATE_KEY_ID,
//   private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
//   client_email: "firebase-adminsdk-i37rt@g5-test-7258e.iam.gserviceaccount.com",
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url:
//     "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i37rt%40g5-test-7258e.iam.gserviceaccount.com",
//   universe_domain: "googleapis.com",
// };

export const firebaseConfig = {
  type: "service_account",
  project_id: "g5-test-7258e",
  private_key_id: "6ce031a7ee3fcf2931bd092d424a7fb9c7f45572",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRnc9i5ZGrQfOy\niyxRsoBSs5Zz6n3lzlH7WNPXO5b/4GSYLpD0tNkTr9xmEydxSNVsEA1gwyqLcoU/\nlMSzzAuakZcbebZ6j6gAhsGIbtlUpoQGLYqBDq6gH1C8ntYBc0jvjgE/uSzptyQ9\nJurm6gNFfsTPCAxRkWcch07F9wvp/Iy2mcmW6RkUJZpVtcOZ5Oziq05zEBjDjZCV\nXZ+AzK0Tt3wQlooPO3i0iI15pBgowvlcyH0K+hVc8XdGO/eOhvIaeIyzGu5T5Y6G\nb4LldMxItwkVhtXwQR+HgkQuPwz3lfnqhB0G7U/pjeEOrMZ4cjdHZxSNzJ5Rq1WM\njCMNz5X9AgMBAAECggEABH6fBAaao0KwhEdOLblHXZ6arwUb6nnMUbijoDWXpQht\nd8Ll2k1nay/l6K1n9tqiMuU8ODMvHhrYRxb8ScOqCwgsporrUgDzEAHTtAZ2dAV3\nBr/ivKYxMd9CBq1cNt8/NN3FYpWopCFIbmQ/fLCPXeXcN/k69GPLA3ZWRtHniD6X\nWwMcnmY5yxsHEr7joobxz+2LcOyPBge4w2VPAApCsXmXtKfi+0SKve1bGo4wTs05\ndhCGQBoDco+7GUuEgxDWH/YQV4LX1YSKAsbveYOE1M5BpN48HMeYrsZvPOAc/pKG\ndFZg0KK+bZeYgXOVnR+U1V3cVbNgfAkYhPALt4zW4QKBgQD4/u8SMNopDOeoomdd\nV1VwgGY4OYzjt90j4nvJ9k6tYHv7I4mPgAz7wLnY9Esu+L9Y4yX44gspUWGCqh6W\nXtNHb2gQqULC32cbOTA0O3puj8nZlEUqWo1vLm23VVqlP3qq9fl21zlVyWTOzTpn\ng48g2n0lgQRE6bm2JGL/rwEboQKBgQDXg0w8PzzybWIStxfcL/badFTHE2SFO0hw\n3gtX3lX4GNVcuBzB4ARbzWV+ehcgHWGJA1xpuMHTNdb5Yx5fB9VViet+WPcfOq1D\nj2LgXevpWFu6knLQszi6b71U//7jvu9DUjWjIeSDybbr5kCUelbpnr+h+qnNJeQh\nvwu8A8E83QKBgDfhXt4CQLO9xa++4tu74dzhtA8iO1BPzz1ics2cjYOzh5+RFioy\nXreRRSQ/jy/3e1oDgF4evMqFDRE6BKtSlLAPfJdgpS7+3DDr4LmYL53ofzBpaixb\nLiqpjM38Rd+YI3uCwH2/R4rNK+aNgHICwHhrEHL+RWsB2T/bYqxnJiSBAoGABtEf\nYzR44A43sPHbrlpSC5zsZZOmdVRnuTI8152vyHY4oYMtXbCRUroPgM2p15k2UZgq\nnyl58A1e7GqHNmhQBjGjok58Gp/HhUCO1xwBb1MdK6ygNxvEKpmIOp0SWe/bL5z1\nF2DmEokZ4SJaXpf0EdW0qBH+tv+A1NRvMZZI0X0CgYEAzVsKxNMeLaiDO9GKj+dd\n7GD8BF0csrxhGKi581DCFX68yXgfzKyeP4Ac9toRHTly08b4Lt7Z+ppEWGijPUnE\nr8SUueHweoa8V+bYOuNC5Nw7jlDjH4UwVMHYBvBpcHxZqac83rqzYcuRXuGgENq0\n+ig2p9XSh/V1/oUnngjHZ8w=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-i37rt@g5-test-7258e.iam.gserviceaccount.com",
  client_id: "100334823145087493095",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i37rt%40g5-test-7258e.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
