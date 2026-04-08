import makeWASocket, { useMultiFileAuthState } from "baileyz";
import { handleMessage } from "./handlers/messageHandler.js";

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, qr } = update;

    if (qr) {
      console.log("📱 Scan QR:");
      console.log(qr);
    }

    if (connection === "open") {
      console.log("✅ Bot Connected");
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    await handleMessage(sock, msg);
  });
}

startBot();
