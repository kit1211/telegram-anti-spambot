/**
 * 🛡️ Anti-Spam Telegram Bot — Single File POC
 *
 * Webhook-based, no dependencies, pure fetch.
 * Adapt to any serverless: Vercel, Cloudflare Workers, Bun.serve, etc.
 */
import type { Language, Translation, GroupData, InlineKeyboardButton, TelegramMessage, CallbackQuery, TelegramUpdate } from "./interface";
// import { translations } from "./language";

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not set");
}
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

export const translations: Record<Language, Translation> = {
  th: {
    panel: {
      title: "ระบบป้องกันสแปม",
      status: "สถานะระบบ",
      defense: "การป้องกัน:",
      active: "█ เปิดใช้งาน █",
      offline: "░ ปิดใช้งาน ░",
      whitelist: "รายการอนุญาต:",
      domains: "โดเมน",
      violations: "การฝ่าฝืน:",
      detected: "ตรวจพบ",
      violators: "ผู้ฝ่าฝืน:",
      users: "คน",
      version: "⟨ CYBERSEC v2.0 ⟩",
    },
    buttons: {
      enableShield: "✅ เปิดการป้องกัน",
      disableShield: "⛔ ปิดการป้องกัน",
      viewWhitelist: "📋 ดูรายการอนุญาต",
      addDomain: "➕ เพิ่มโดเมน",
      removeDomain: "➖ ลบโดเมน",
      statistics: "📊 สถิติ",
      unmuteAll: "🔓 ปลดมิวท์ทั้งหมด",
      refresh: "🔄 รีเฟรช",
      back: "◀️ กลับ",
      resetStats: "🧹 รีเซ็ตสถิติ",
      delete: "🗑️ ลบ",
      changeLang: "🌐 ภาษา",
    },
    messages: {
      accessDenied: "⛔ ปฏิเสธการเข้าถึง",
      adminOnly: "เฉพาะแอดมินเท่านั้น",
      shieldActivated: "🟢 เปิดการป้องกันแล้ว",
      shieldDeactivated: "🔴 ปิดการป้องกันแล้ว",
      syntax: "รูปแบบ:",
      alreadyInWhitelist: "อยู่ในรายการแล้ว",
      added: "เพิ่มแล้ว:",
      notFound: "ไม่พบในรายการ",
      deleted: "ลบแล้ว:",
      statsReset: "🧹 รีเซ็ตสถิติแล้ว",
      unmuted: "🔓 ปลดมิวท์แล้ว",
    },
    start: {
      title: "ระบบป้องกันสแปม",
      initializing: "▸ กำลังเริ่มต้น...",
      ready: "▸ ระบบพร้อม",
      quickStart: "⟨ เริ่มต้นใช้งาน ⟩",
      step1: "เพิ่มบอทเข้ากลุ่ม",
      step2: "ตั้งเป็น",
      step3: "พิมพ์",
      step4: "จัดการผ่านปุ่มกด",
      commands: "⟨ คำสั่ง ⟩",
      panelDesc: "แผงควบคุม",
      addUrlDesc: "เพิ่มรายการอนุญาต",
      removeUrlDesc: "ลบรายการอนุญาต",
    },
    whitelist: {
      title: "รายการอนุญาต",
      total: "▸ ทั้งหมด:",
      empty: "⚠️ ไม่มีข้อมูล",
      allBlocked: "ทุกลิงก์จะถูกบล็อก",
    },
    stats: {
      title: "บันทึกการฝ่าฝืน",
      total: "▸ ทั้งหมด:",
      noViolations: "✅ ไม่มีการฝ่าฝืน",
      systemNormal: "ระบบทำงานปกติ",
    },
    addUrl: {
      title: "เพิ่มเข้ารายการอนุญาต",
      syntax: "▸ รูปแบบคำสั่ง:",
      examples: "⟨ ตัวอย่าง ⟩",
      prompt: "📝 กรุณาส่งโดเมนที่ต้องการเพิ่ม\n\nตัวอย่าง: google.com, youtube.com",
      cancel: "❌ ยกเลิก",
    },
    removeUrl: {
      title: "ลบออกจากรายการอนุญาต",
      prompt: "📝 กรุณาส่งโดเมนที่ต้องการลบ",
      cancel: "❌ ยกเลิก",
    },
    violation: {
      title: "ปฏิเสธการเข้าถึง",
      blocked: "▸ บล็อก URL ที่ไม่ได้รับอนุญาต",
      user: "ผู้ใช้:",
      count: "จำนวน:",
      status: "สถานะ:",
      muted: "ถูกมิวท์",
      adminHint: "💡 แอดมิน: ใช้ /panel เพื่อปลดมิวท์",
    },
  },
  lo: {
    panel: {
      title: "ລະບົບປ້ອງກັນສະແປມ",
      status: "ສະຖານະລະບົບ",
      defense: "ການປ້ອງກັນ:",
      active: "█ ເປີດນຳໃຊ້ █",
      offline: "░ ປິດນຳໃຊ້ ░",
      whitelist: "ລາຍການອະນຸຍາດ:",
      domains: "ໂດເມນ",
      violations: "ການລະເມີດ:",
      detected: "ກວດພົບ",
      violators: "ຜູ້ລະເມີດ:",
      users: "ຄົນ",
      version: "⟨ CYBERSEC v2.0 ⟩",
    },
    buttons: {
      enableShield: "✅ ເປີດການປ້ອງກັນ",
      disableShield: "⛔ ປິດການປ້ອງກັນ",
      viewWhitelist: "📋 ເບິ່ງລາຍການອະນຸຍາດ",
      addDomain: "➕ ເພີ່ມໂດເມນ",
      removeDomain: "➖ ລຶບໂດເມນ",
      statistics: "📊 ສະຖິຕິ",
      unmuteAll: "🔓 ປົດມິວທ໌ທັງໝົດ",
      refresh: "🔄 ໂຫຼດໃໝ່",
      back: "◀️ ກັບຄືນ",
      resetStats: "🧹 ຣີເຊັດສະຖິຕິ",
      delete: "🗑️ ລຶບ",
      changeLang: "🌐 ພາສາ",
    },
    messages: {
      accessDenied: "⛔ ປະຕິເສດການເຂົ້າເຖິງ",
      adminOnly: "ສຳລັບແອດມິນເທົ່ານັ້ນ",
      shieldActivated: "🟢 ເປີດການປ້ອງກັນແລ້ວ",
      shieldDeactivated: "🔴 ປິດການປ້ອງກັນແລ້ວ",
      syntax: "ຮູບແບບ:",
      alreadyInWhitelist: "ມີຢູ່ໃນລາຍການແລ້ວ",
      added: "ເພີ່ມແລ້ວ:",
      notFound: "ບໍ່ພົບໃນລາຍການ",
      deleted: "ລຶບແລ້ວ:",
      statsReset: "🧹 ຣີເຊັດສະຖິຕິແລ້ວ",
      unmuted: "🔓 ປົດມິວທ໌แລ້ວ",
    },
    start: {
      title: "ລະບົບປ້ອງກັນສະແປມ",
      initializing: "▸ ກຳລັງເລີ່ມຕົ້ນ...",
      ready: "▸ ລະບົບພ້ອມ",
      quickStart: "⟨ ເລີ່ມຕົ້ນໃຊ້ງານ ⟩",
      step1: "ເພີ່ມບອດເຂົ້າກຸ່ມ",
      step2: "ຕັ້ງເປັນ",
      step3: "ພິມ",
      step4: "ຈັດການຜ່ານປຸ່ມກົດ",
      commands: "⟨ ຄຳສັ່ງ ⟩",
      panelDesc: "ແຜງຄວບຄຸມ",
      addUrlDesc: "ເພີ່ມລາຍການອະນຸຍາດ",
      removeUrlDesc: "ລຶບລາຍການອະນຸຍາດ",
    },
    whitelist: {
      title: "ລາຍການອະນຸຍາດ",
      total: "▸ ທັງໝົດ:",
      empty: "⚠️ ບໍ່ມີຂໍ້ມູນ",
      allBlocked: "ທຸກລິ້ງຈະຖືກບລັອກ",
    },
    stats: {
      title: "ບັນທຶກການລະເມີດ",
      total: "▸ ທັງໝົດ:",
      noViolations: "✅ ບໍ່ມີການລະເມີດ",
      systemNormal: "ລະບົບເຮັດວຽກປົກກະຕິ",
    },
    addUrl: {
      title: "ເພີ່ມເຂົ້າລາຍການອະນຸຍາດ",
      syntax: "▸ ຮູບແບບຄຳສັ່ງ:",
      examples: "⟨ ຕົວຢ່າງ ⟩",
      prompt: "📝 ກະລຸນາສົ່ງໂດເມນທີ່ຕ້ອງການເພີ່ມ\n\nຕົວຢ່າງ: google.com, youtube.com",
      cancel: "❌ ຍົກເລີກ",
    },
    removeUrl: {
      title: "ລຶບອອກຈາກລາຍການອະນຸຍາດ",
      prompt: "📝 ກະລຸນາສົ່ງໂດເມນທີ່ຕ້ອງການລຶບ",
      cancel: "❌ ຍົກເລີກ",
    },
    violation: {
      title: "ປະຕິເສດການເຂົ້າເຖິງ",
      blocked: "▸ ບລັອກ URL ທີ່ບໍ່ໄດ້ຮັບອະນຸຍາດ",
      user: "ຜູ້ໃຊ້:",
      count: "ຈຳນວນ:",
      status: "ສະຖານະ:",
      muted: "ຖືກມິວທ໌",
      adminHint: "💡 ແອດມິນ: ໃຊ້ /panel ເພື່ອປົດມິວທ໌",
    },
  },
  en: {
    panel: {
      title: "ANTI-SPAM SYSTEM",
      status: "SYSTEM STATUS",
      defense: "DEFENSE:",
      active: "█ ACTIVE █",
      offline: "░ OFFLINE ░",
      whitelist: "WHITELIST:",
      domains: "DOMAINS",
      violations: "VIOLATIONS:",
      detected: "DETECTED",
      violators: "VIOLATORS:",
      users: "USERS",
      version: "⟨ CYBERSEC v2.0 ⟩",
    },
    buttons: {
      enableShield: "✅ ENABLE SHIELD",
      disableShield: "⛔ DISABLE SHIELD",
      viewWhitelist: "📋 VIEW WHITELIST",
      addDomain: "➕ ADD DOMAIN",
      removeDomain: "➖ REMOVE DOMAIN",
      statistics: "📊 STATISTICS",
      unmuteAll: "🔓 UNMUTE ALL",
      refresh: "🔄 REFRESH DATA",
      back: "◀️ BACK",
      resetStats: "🧹 RESET STATS",
      delete: "🗑️ DELETE",
      changeLang: "🌐 LANGUAGE",
    },
    messages: {
      accessDenied: "⛔ ACCESS DENIED",
      adminOnly: "Admin only",
      shieldActivated: "🟢 SHIELD ACTIVATED",
      shieldDeactivated: "🔴 SHIELD DEACTIVATED",
      syntax: "SYNTAX:",
      alreadyInWhitelist: "Already in whitelist",
      added: "ADDED:",
      notFound: "Not found in whitelist",
      deleted: "DELETED:",
      statsReset: "🧹 STATS RESET COMPLETE",
      unmuted: "🔓 UNMUTED",
    },
    start: {
      title: "ANTI-SPAM SYSTEM",
      initializing: "▸ INITIALIZING...",
      ready: "▸ SYSTEM READY",
      quickStart: "⟨ QUICK START ⟩",
      step1: "Add bot to group",
      step2: "Set as",
      step3: "Type",
      step4: "Manage via buttons",
      commands: "⟨ COMMANDS ⟩",
      panelDesc: "Control panel",
      addUrlDesc: "Add to whitelist",
      removeUrlDesc: "Remove from whitelist",
    },
    whitelist: {
      title: "WHITELIST DATA",
      total: "▸ TOTAL:",
      empty: "⚠️ EMPTY DATABASE",
      allBlocked: "All links will be blocked",
    },
    stats: {
      title: "VIOLATION LOG",
      total: "▸ TOTAL:",
      noViolations: "✅ NO VIOLATIONS",
      systemNormal: "System running normally",
    },
    addUrl: {
      title: "ADD TO WHITELIST",
      syntax: "▸ COMMAND SYNTAX:",
      examples: "⟨ EXAMPLES ⟩",
      prompt: "📝 Please send the domain to add\n\nExample: google.com, youtube.com",
      cancel: "❌ CANCEL",
    },
    removeUrl: {
      title: "REMOVE FROM WHITELIST",
      prompt: "📝 Please send the domain to remove",
      cancel: "❌ CANCEL",
    },
    violation: {
      title: "ACCESS DENIED",
      blocked: "▸ UNAUTHORIZED URL BLOCKED",
      user: "USER:",
      count: "COUNT:",
      status: "STATUS:",
      muted: "MUTED",
      adminHint: "💡 Admin: Use /panel to unmute",
    },
  },
};

// ─── JSON File Store ───

const DATA_FILE = "./data/store.json";
let store: Record<string, GroupData> = {};
let isLoaded = false;

async function loadStore(): Promise<void> {
  if (isLoaded) return;
  try {
    if (typeof Bun !== "undefined") {
      const file = Bun.file(DATA_FILE);
      if (await file.exists()) {
        const content = await file.text();
        if (content.trim()) {
          store = JSON.parse(content);
          console.log("✅ Loaded store from", DATA_FILE);
        } else {
          console.log("⚠️ Store file is empty, initializing fresh");
          store = {};
        }
      } else {
        console.log("ℹ️ No existing store, starting fresh");
        store = {};
      }
    } else {
      const fs = await import("fs/promises");
      try {
        const content = await fs.readFile(DATA_FILE, "utf-8");
        if (content.trim()) {
          store = JSON.parse(content);
          console.log("✅ Loaded store from", DATA_FILE);
        } else {
          store = {};
        }
      } catch {
        console.log("ℹ️ No existing store, starting fresh");
        store = {};
      }
    }
  } catch (error) {
    console.error("⚠️ Error loading store, resetting:", error);
    store = {};
    if (typeof Bun !== "undefined") {
      await Bun.write(DATA_FILE, "{}");
    } else {
      const fs = await import("fs/promises");
      await fs.writeFile(DATA_FILE, "{}", "utf-8");
    }
  }
  isLoaded = true;
}

async function saveStore(): Promise<void> {
  try {
    const data = JSON.stringify(store, null, 2);
    if (typeof Bun !== "undefined" && import.meta.main) {
      await Bun.write(DATA_FILE, data);
    } else {
      console.log("ℹ️ Running on serverless - using in-memory storage");
    }
  } catch (error) {
    console.error("⚠️ Error saving store:", error);
  }
}

async function getGroup(chatId: string): Promise<GroupData> {
  await loadStore();
  if (!store[chatId]) {
    store[chatId] = { enabled: true, whitelist: [], violations: {}, groupName: "", language: "en" };
    await saveStore();
  }
  return store[chatId];
}

async function updateGroup(chatId: string, updates: Partial<GroupData>): Promise<void> {
  await loadStore();
  store[chatId] = { ...store[chatId], ...updates } as GroupData;
  await saveStore();
}

function getLang(chatId: string): Language {
  return store[chatId]?.language || "en";
}

function t(chatId: string): Translation {
  return translations[getLang(chatId)];
}

// ─── Telegram API Helpers ───

async function tg(method: string, body: Record<string, unknown>) {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

const sendMessage = (chatId: number, text: string, keyboard?: InlineKeyboardButton[][]) =>
  tg("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...(keyboard && { reply_markup: { inline_keyboard: keyboard } }),
  });

const answerCallback = (id: string, text?: string, showAlert = false) =>
  tg("answerCallbackQuery", { callback_query_id: id, text, show_alert: showAlert });

const editMessage = (chatId: number, msgId: number, text: string, keyboard?: InlineKeyboardButton[][]) =>
  tg("editMessageText", {
    chat_id: chatId,
    message_id: msgId,
    text,
    parse_mode: "HTML",
    ...(keyboard && { reply_markup: { inline_keyboard: keyboard } }),
  });

const deleteMessage = (chatId: number, msgId: number) =>
  tg("deleteMessage", { chat_id: chatId, message_id: msgId });

const restrictMember = (chatId: number, userId: number, canSend: boolean) =>
  tg("restrictChatMember", {
    chat_id: chatId,
    user_id: userId,
    permissions: {
      can_send_messages: canSend,
      can_send_media_messages: canSend,
      can_send_other_messages: canSend,
      can_add_web_page_previews: canSend,
    },
  });

async function isAdmin(chatId: number, userId: number): Promise<boolean> {
  const res: any = await tg("getChatMember", { chat_id: chatId, user_id: userId });
  return res?.result?.status === "administrator" || res?.result?.status === "creator";
}

async function getUserName(chatId: number, userId: number): Promise<string> {
  const res: any = await tg("getChatMember", { chat_id: chatId, user_id: userId });
  const u = res?.result?.user;
  return u ? u.first_name + (u.last_name ? ` ${u.last_name}` : "") : `User ${userId}`;
}

// ─── URL Detection ───

const URL_REGEX =
  /(?:https?:\/\/|ftp:\/\/|www\.)[^\s<>\[\](){}"'`]+|(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:com|net|org|io|co|me|info|biz|xyz|app|dev|th|uk|de|fr|jp|cn|ru|tv|cc|gg|ly|link|shop|store|online|site|tech|ai|id)\b(?:\/[^\s<>\[\](){}"'`]*)?/gi;

function extractUrls(text: string): string[] {
  return [...(text.match(URL_REGEX) || [])];
}

function getDomain(url: string): string {
  return url
    .toLowerCase()
    .replace(/^(?:https?:\/\/|ftp:\/\/)/, "")
    .replace(/^www\./, "")
    .split(/[/?#]/)[0] || "";
}

function isWhitelisted(url: string, whitelist: string[]): boolean {
  const domain = getDomain(url);
  return whitelist.some((w) => {
    const clean = w.toLowerCase().replace(/^(?:https?:\/\/|ftp:\/\/)/, "").replace(/^www\./, "").replace(/\/$/, "");
    return domain === clean || domain.endsWith(`.${clean}`);
  });
}

// ─── Panel UI ───

async function buildPanel(chatId: string): Promise<{ text: string; keyboard: InlineKeyboardButton[][] }> {
  const g = await getGroup(chatId);
  const tr = t(chatId);
  const on = g.enabled;
  const totalViolations = Object.values(g.violations).reduce((a, b) => a + b, 0);
  const totalViolators = Object.keys(g.violations).length;

  const text = [
    `⚡ <b>${tr.panel.title}</b> ⚡`,
    ``,
    `<b>⟨ ${tr.panel.status} ⟩</b>`,
    ``,
    `${on ? "🟢 ▸" : "🔴 ▸"} <b>${tr.panel.defense}</b> <code>${on ? tr.panel.active : tr.panel.offline}</code>`,
    `🔗 ▸ <b>${tr.panel.whitelist}</b> <code>${g.whitelist.length} ${tr.panel.domains}</code>`,
    `⚠️ ▸ <b>${tr.panel.violations}</b> <code>${totalViolations} ${tr.panel.detected}</code>`,
    `🚫 ▸ <b>${tr.panel.violators}</b> <code>${totalViolators} ${tr.panel.users}</code>`,
    ``,
    `<i>${tr.panel.version}</i>`,
  ].join("\n");

  const keyboard: InlineKeyboardButton[][] = [
    [{ text: on ? tr.buttons.disableShield : tr.buttons.enableShield, callback_data: `toggle|${chatId}` }],
    [
      { text: tr.buttons.addDomain, callback_data: `add_wl|${chatId}` },
      { text: tr.buttons.removeDomain, callback_data: `remove_wl|${chatId}` },
    ],
    [
      { text: tr.buttons.viewWhitelist, callback_data: `view_wl|${chatId}` },
      { text: tr.buttons.statistics, callback_data: `stats|${chatId}` },
    ],
    [
      { text: tr.buttons.unmuteAll, callback_data: `unmute_all|${chatId}` },
      { text: tr.buttons.changeLang, callback_data: `lang|${chatId}` },
    ],
    [{ text: tr.buttons.refresh, callback_data: `refresh|${chatId}` }],
  ];

  return { text, keyboard };
}

// ─── Command Handlers ───

async function handleCommand(msg: TelegramMessage) {
  const text = msg.text || "";
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  if (!userId) return;

  const [cmd, ...args] = text.split(" ");

  if (cmd === "/start" && msg.chat.type === "private") {
    const tr = t(String(chatId));
    return sendMessage(chatId, [
      `⚡ <b>${tr.start.title}</b> ⚡`,
      ``,
      `<code>${tr.start.initializing}</code>`,
      `<code>${tr.start.ready}</code>`,
      ``,
      `<b>${tr.start.quickStart}</b>`,
      ``,
      `<b>1.</b> ${tr.start.step1}`,
      `<b>2.</b> ${tr.start.step2} <code>ADMIN</code>`,
      `<b>3.</b> ${tr.start.step3} <code>/panel</code>`,
      `<b>4.</b> ${tr.start.step4}`,
      ``,
      `<b>${tr.start.commands}</b>`,
      ``,
      `<code>/panel</code> — ${tr.start.panelDesc}`,
      `<code>/addurl &lt;url&gt;</code> — ${tr.start.addUrlDesc}`,
      `<code>/removeurl &lt;url&gt;</code> — ${tr.start.removeUrlDesc}`,
      ``,
      `<i>${tr.panel.version}</i>`,
    ].join("\n"));
  }

  if (cmd === "/panel" || (cmd === "/start" && msg.chat.type !== "private")) {
    const tr = t(String(chatId));
    if (!(await isAdmin(chatId, userId))) return sendMessage(chatId, `${tr.messages.accessDenied} — ${tr.messages.adminOnly}`);
    const g = await getGroup(String(chatId));
    g.groupName = msg.chat.title || "";
    await saveStore();
    const { text: panelText, keyboard } = await buildPanel(String(chatId));
    return sendMessage(chatId, panelText, keyboard);
  }

  if (cmd === "/addurl") {
    const tr = t(String(chatId));
    if (!(await isAdmin(chatId, userId))) return sendMessage(chatId, `${tr.messages.accessDenied} — ${tr.messages.adminOnly}`);
    if (!args[0]) return sendMessage(chatId, `📝 <b>${tr.messages.syntax}</b> <code>/addurl example.com</code>`);
    const domain = getDomain(args[0]);
    const g = await getGroup(String(chatId));
    if (g.whitelist.includes(domain)) return sendMessage(chatId, `ℹ️ <code>${domain}</code> — ${tr.messages.alreadyInWhitelist}`);
    g.whitelist.push(domain);
    await saveStore();
    return sendMessage(chatId, `✅ <b>${tr.messages.added}</b> <code>${domain}</code>`);
  }

  if (cmd === "/removeurl") {
    const tr = t(String(chatId));
    if (!(await isAdmin(chatId, userId))) return sendMessage(chatId, `${tr.messages.accessDenied} — ${tr.messages.adminOnly}`);
    if (!args[0]) return sendMessage(chatId, `📝 <b>${tr.messages.syntax}</b> <code>/removeurl example.com</code>`);
    const domain = getDomain(args[0]);
    const g = await getGroup(String(chatId));
    const idx = g.whitelist.indexOf(domain);
    if (idx === -1) return sendMessage(chatId, `⚠️ <code>${domain}</code> — ${tr.messages.notFound}`);
    g.whitelist.splice(idx, 1);
    await saveStore();
    return sendMessage(chatId, `🗑️ <b>${tr.messages.deleted}</b> <code>${domain}</code>`);
  }
}

// ─── Callback (Button) Handler ───

async function handleCallback(cb: CallbackQuery) {
  const [action, chatId, extra] = (cb.data || "").split("|");
  const msgChatId = cb.message?.chat.id;
  const msgId = cb.message?.message_id;
  if (!chatId || !msgChatId || !msgId) return;

  const tr = t(chatId);

  if (!(await isAdmin(Number(chatId), cb.from.id))) {
    return answerCallback(cb.id, `${tr.messages.accessDenied} — ${tr.messages.adminOnly}`, true);
  }

  const g = await getGroup(chatId);

  switch (action) {
    case "toggle": {
      g.enabled = !g.enabled;
      await saveStore();
      await answerCallback(cb.id, g.enabled ? tr.messages.shieldActivated : tr.messages.shieldDeactivated);
      const { text, keyboard } = await buildPanel(chatId);
      return editMessage(msgChatId, msgId, text, keyboard);
    }

    case "refresh": {
      await answerCallback(cb.id);
      const { text, keyboard } = await buildPanel(chatId);
      return editMessage(msgChatId, msgId, text, keyboard);
    }

    case "lang": {
      await answerCallback(cb.id);
      const currentLang = g.language;
      const langNames = { th: "🇹🇭 ไทย", lo: "🇱🇦 ລາວ", en: "🇬🇧 English" };
      const text = [
        `🌐 <b>LANGUAGE / ພາສາ</b>`,
        ``,
        `<code>▸ CURRENT: ${langNames[currentLang]}</code>`,
        ``,
        `<i>เลือกภาษา / ເລືອກພາສາ / Select language</i>`,
        ``,
      ].join("\n");
      const keyboard: InlineKeyboardButton[][] = [
        [{ text: "🇹🇭 ภาษาไทย", callback_data: `set_lang|${chatId}|th` }],
        [{ text: "🇱🇦 ພາສາລາວ", callback_data: `set_lang|${chatId}|lo` }],
        [{ text: "🇬🇧 English", callback_data: `set_lang|${chatId}|en` }],
        [{ text: tr.buttons.back, callback_data: `refresh|${chatId}` }],
      ];
      return editMessage(msgChatId, msgId, text, keyboard);
    }

    case "set_lang": {
      const newLang = extra as Language;
      if (["th", "lo", "en"].includes(newLang)) {
        g.language = newLang;
        await saveStore();
        const langNames = { th: "🇹🇭 ไทย", lo: "🇱🇦 ລາວ", en: "🇬🇧 English" };
        await answerCallback(cb.id, `✅ ${langNames[newLang]}`, true);
      }
      const { text, keyboard } = await buildPanel(chatId);
      return editMessage(msgChatId, msgId, text, keyboard);
    }

    case "view_wl": {
      await answerCallback(cb.id);
      const wl = g.whitelist;
      const text = wl.length
        ? [
            `╔═══════════════════════╗`,
            `║  📋 <b>${tr.whitelist.title}</b>  ║`,
            `╚═══════════════════════╝`,
            ``,
            `<code>${tr.whitelist.total} ${wl.length} ${tr.panel.domains}</code>`,
            ``,
            ...wl.map((d, i) => `<code>${String(i + 1).padStart(2, "0")}.</code> <code>${d}</code>`),
            ``,
            `<code>═══════════════════════════</code>`,
          ].join("\n")
        : [
            `╔═══════════════════════╗`,
            `║  📋 <b>${tr.whitelist.title}</b>  ║`,
            `╚═══════════════════════╝`,
            ``,
            `<code>${tr.whitelist.empty}</code>`,
            ``,
            `<i>${tr.whitelist.allBlocked}</i>`,
            ``,
            `<code>═══════════════════════════</code>`,
          ].join("\n");
      const keyboard: InlineKeyboardButton[][] = [
        ...wl.map((d, i) => [{ text: `${tr.buttons.delete} ${d}`, callback_data: `rm_wl|${chatId}|${i}` }]),
        [{ text: tr.buttons.back, callback_data: `refresh|${chatId}` }],
      ];
      return editMessage(msgChatId, msgId, text, keyboard);
    }

    case "rm_wl": {
      const idx = Number(extra);
      if (idx >= 0 && idx < g.whitelist.length) {
        const removed = g.whitelist.splice(idx, 1)[0];
        await saveStore();
        await answerCallback(cb.id, `${tr.messages.deleted} ${removed}`, true);
      }
      const wl = g.whitelist;
      const text = wl.length
        ? [
            `╔═══════════════════════╗`,
            `║  📋 <b>${tr.whitelist.title}</b>  ║`,
            `╚═══════════════════════╝`,
            ``,
            `<code>${tr.whitelist.total} ${wl.length} ${tr.panel.domains}</code>`,
            ``,
            ...wl.map((d, i) => `<code>${String(i + 1).padStart(2, "0")}.</code> <code>${d}</code>`),
            ``,
            `<code>═══════════════════════════</code>`,
          ].join("\n")
        : [
            `╔═══════════════════════╗`,
            `║  📋 <b>${tr.whitelist.title}</b>  ║`,
            `╚═══════════════════════╝`,
            ``,
            `<code>${tr.whitelist.empty}</code>`,
            ``,
            `<code>═══════════════════════════</code>`,
          ].join("\n");
      const keyboard: InlineKeyboardButton[][] = [
        ...wl.map((d, i) => [{ text: `${tr.buttons.delete} ${d}`, callback_data: `rm_wl|${chatId}|${i}` }]),
        [{ text: tr.buttons.back, callback_data: `refresh|${chatId}` }],
      ];
      return editMessage(msgChatId, msgId, text, keyboard);
    }

    case "add_wl": {
      await answerCallback(cb.id);
      g.pendingAction = {
        userId: cb.from.id,
        action: "add_url",
        messageId: msgId,
      };
      await saveStore();
      const text = [
        `╔═══════════════════════╗`,
        `║  ➕ <b>${tr.addUrl.title}</b> ║`,
        `╚═══════════════════════╝`,
        ``,
        `<code>${tr.addUrl.prompt}</code>`,
        ``,
        `<code>═══════════════════════════</code>`,
      ].join("\n");
      return editMessage(msgChatId, msgId, text, [[{ text: tr.addUrl.cancel, callback_data: `cancel|${chatId}` }]]);
    }

    case "remove_wl": {
      await answerCallback(cb.id);
      g.pendingAction = {
        userId: cb.from.id,
        action: "remove_url",
        messageId: msgId,
      };
      await saveStore();
      const text = [
        `╔═══════════════════════╗`,
        `║  ➖ <b>${tr.removeUrl.title}</b> ║`,
        `╚═══════════════════════╝`,
        ``,
        `<code>${tr.removeUrl.prompt}</code>`,
        ``,
        `<code>═══════════════════════════</code>`,
      ].join("\n");
      return editMessage(msgChatId, msgId, text, [[{ text: tr.removeUrl.cancel, callback_data: `cancel|${chatId}` }]]);
    }

    case "cancel": {
      delete g.pendingAction;
      await saveStore();
      await answerCallback(cb.id, "❌", true);
      const { text, keyboard } = await buildPanel(chatId);
      return editMessage(msgChatId, msgId, text, keyboard);
    }

    case "stats": {
      await answerCallback(cb.id);
      const v = g.violations;
      const entries = Object.entries(v).sort(([, a], [, b]) => b - a);
      let text: string;
      if (entries.length) {
        const lines = await Promise.all(
          entries.slice(0, 15).map(async ([uid, count], i) => {
            const name = await getUserName(Number(chatId), Number(uid));
            return `<code>${String(i + 1).padStart(2, "0")}.</code> <b>${name}</b> — <code>${count}x</code>`;
          })
        );
        const total = Object.values(v).reduce((a, b) => a + b, 0);
        text = [
          `📊 <b>${tr.stats.title}</b>`,
          ``,
          `<code>${tr.stats.total} ${total} ${tr.panel.violations}</code>`,
          ``,
          ...lines,
          ``,
        ].join("\n");
      } else {
        text = [
          `📊 <b>${tr.stats.title}</b>`,
          ``,
          `<code>${tr.stats.noViolations}</code>`,
          ``,
          `<i>${tr.stats.systemNormal}</i>`,
          ``,
        ].join("\n");
      }
      return editMessage(msgChatId, msgId, text, [
        [{ text: tr.buttons.resetStats, callback_data: `reset_stats|${chatId}` }],
        [{ text: tr.buttons.back, callback_data: `refresh|${chatId}` }],
      ]);
    }

    case "reset_stats": {
      g.violations = {};
      await saveStore();
      await answerCallback(cb.id, tr.messages.statsReset, true);
      const { text, keyboard } = await buildPanel(chatId);
      return editMessage(msgChatId, msgId, text, keyboard);
    }

    case "unmute_all": {
      let count = 0;
      for (const uid of Object.keys(g.violations)) {
        try {
          await restrictMember(Number(chatId), Number(uid), true);
          count++;
        } catch {}
      }
      await answerCallback(cb.id, `${tr.messages.unmuted} ${count} ${tr.panel.users}`, true);
      const { text, keyboard } = await buildPanel(chatId);
      return editMessage(msgChatId, msgId, text, keyboard);
    }
  }
}

// ─── Spam Check ───

async function checkSpam(msg: TelegramMessage) {
  if (msg.chat.type === "private" || !msg.from) return;

  const chatId = String(msg.chat.id);
  await loadStore();
  const g = store[chatId];
  if (!g || !g.enabled) return;

  if (await isAdmin(msg.chat.id, msg.from.id)) return;

  // Collect all text + entity URLs
  let combined = `${msg.text || ""} ${msg.caption || ""}`;
  for (const ent of [...(msg.entities || []), ...(msg.caption_entities || [])]) {
    if (ent.url) combined += ` ${ent.url}`;
  }

  const urls = extractUrls(combined);
  if (!urls.length) return;

  const hasViolation = urls.some((u) => !isWhitelisted(u, g.whitelist));
  if (!hasViolation) return;

  // ── Violation! ──
  const userId = String(msg.from.id);
  const userName = msg.from.first_name + (msg.from.last_name ? ` ${msg.from.last_name}` : "");

  // 1) Delete
  await deleteMessage(msg.chat.id, msg.message_id).catch(() => {});

  // 2) Mute
  await restrictMember(msg.chat.id, msg.from.id, false).catch(() => {});

  // 3) Record
  g.violations[userId] = (g.violations[userId] || 0) + 1;
  await saveStore();

  // 4) Notify (auto-delete after 30s)
  const tr = t(chatId);
  const notify = [
    `🚫 <b>${tr.violation.title}</b>`,
    ``,
    `<code>${tr.violation.blocked}</code>`,
    ``,
    `👤 <b>${tr.violation.user}</b> <code>${userName}</code>`,
    `⚠️ <b>${tr.violation.count}</b> <code>${g.violations[userId]}x</code>`,
    `🔇 <b>${tr.violation.status}</b> <code>${tr.violation.muted}</code>`,
    ``,
    `<i>${tr.violation.adminHint}</i>`,
    ``,
  ].join("\n");

  const res: any = await sendMessage(msg.chat.id, notify);
  if (res?.result?.message_id) {
    setTimeout(() => deleteMessage(msg.chat.id, res.result.message_id).catch(() => {}), 30_000);
  }
}

// ─── Webhook Entry Point ───

async function handlePendingAction(msg: TelegramMessage): Promise<boolean> {
  const chatId = String(msg.chat.id);
  const userId = msg.from?.id;
  if (!userId) return false;

  await loadStore();
  const g = store[chatId];
  if (!g?.pendingAction || g.pendingAction.userId !== userId) return false;

  const tr = t(chatId);
  const text = msg.text?.trim() || "";
  if (!text) return false;

  const domain = getDomain(text);
  const action = g.pendingAction.action;
  const msgId = g.pendingAction.messageId;

  delete g.pendingAction;

  if (action === "add_url") {
    if (g.whitelist.includes(domain)) {
      await saveStore();
      await sendMessage(msg.chat.id, `ℹ️ <code>${domain}</code> — ${tr.messages.alreadyInWhitelist}`);
    } else {
      g.whitelist.push(domain);
      await saveStore();
      await sendMessage(msg.chat.id, `✅ <b>${tr.messages.added}</b> <code>${domain}</code>`);
    }
  } else if (action === "remove_url") {
    const idx = g.whitelist.indexOf(domain);
    if (idx === -1) {
      await saveStore();
      await sendMessage(msg.chat.id, `⚠️ <code>${domain}</code> — ${tr.messages.notFound}`);
    } else {
      g.whitelist.splice(idx, 1);
      await saveStore();
      await sendMessage(msg.chat.id, `🗑️ <b>${tr.messages.deleted}</b> <code>${domain}</code>`);
    }
  }

  const { text: panelText, keyboard } = await buildPanel(chatId);
  await editMessage(msg.chat.id, msgId, panelText, keyboard);

  return true;
}

export async function handleUpdate(update: TelegramUpdate): Promise<void> {
  if (update.callback_query) {
    await handleCallback(update.callback_query);
  } else if (update.message) {
    const text = update.message.text || "";
    if (text.startsWith("/")) {
      await handleCommand(update.message);
    } else {
      const handled = await handlePendingAction(update.message);
      if (!handled) {
        await checkSpam(update.message);
      }
    }
  }
}

// ─── Setup Webhook ───

export async function setWebhook(url: string) {
  return tg("setWebhook", { url, allowed_updates: ["message", "callback_query"] });
}

// ─── Standalone: Bun.serve for local testing ───

if (typeof Bun !== "undefined" && import.meta.main) {
  const PORT = Number(process.env.PORT) || 3000;
  const WEBHOOK_URL = process.env.WEBHOOK_URL;
  
  if (WEBHOOK_URL) {
    const fullWebhookUrl = WEBHOOK_URL.endsWith("/webhook") || WEBHOOK_URL.endsWith("/api/webhook")
      ? WEBHOOK_URL
      : `${WEBHOOK_URL}/api/webhook`;
    console.log("Setting webhook to:", fullWebhookUrl);
    setWebhook(fullWebhookUrl).then((r) => console.log("Webhook set:", JSON.stringify(r)));
  }

  Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);

      if (req.method === "GET" && url.pathname === "/") {
        return new Response("⚡ ANTI-SPAM SYSTEM — ONLINE ⚡", {
          headers: { "Content-Type": "text/plain" },
        });
      }

      if (req.method === "POST" && (url.pathname === "/webhook" || url.pathname === "/api/webhook")) {
        try {
          const update = (await req.json()) as TelegramUpdate;
          await handleUpdate(update);
          return new Response(JSON.stringify({ ok: true }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Webhook error:", error);
          return new Response(JSON.stringify({ ok: false, error: String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      }

      if (req.method === "GET" && url.pathname === "/api/setup") {
        const webhookUrl = url.searchParams.get("url");
        if (!webhookUrl) {
          return new Response(JSON.stringify({ error: "Missing 'url' parameter" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        const result = await setWebhook(webhookUrl);
        return new Response(JSON.stringify(result), {
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.log(`⚡ ANTI-SPAM SYSTEM — Port :${PORT} — ACTIVE ⚡`);
}