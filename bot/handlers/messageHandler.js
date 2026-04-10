import { ref, get } from "firebase/database";
import { db } from "../firebase.js";

export async function handleMessage(sock, msg) {
  const jid = msg.key.remoteJid;

  const text =
    msg.message.conversation ||
    msg.message.extendedTextMessage?.text ||
    "";

  const hour = new Date().getHours();

  let greeting = "Hello 👋";
  if (hour < 12) greeting = "🌅 Good Morning";
  else if (hour < 18) greeting = "🌤 Good Afternoon";
  else greeting = "🌙 Good Evening";

  const snap = await get(ref(db, "settings/welcome"));

  const welcome = snap.exists()
    ? snap.val()
    : `${greeting}\nWelcome to E-Things 🛒`;

  if (text.toLowerCase() === "hi" || text.toLowerCase() === "menu") {
    return sock.sendMessage(jid, { text: welcome });
  }

  const prodSnap = await get(ref(db, "products/" + text.toLowerCase()));

  if (prodSnap.exists()) {
    const data = prodSnap.val();

    return sock.sendMessage(jid, {
      text: `🛒 Product: ${text}\n💰 Price: ${data.price}`
    });
  }

  return sock.sendMessage(jid, {
    text: "Type *menu* to see products 🛍"
  });
}
