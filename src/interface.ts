
interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
  }
  
  interface TelegramChat {
    id: number;
    title?: string;
    type: "private" | "group" | "supergroup" | "channel";
  }
  
  interface MessageEntity {
    type: string;
    offset: number;
    length: number;
    url?: string;
  }
  
  interface TelegramMessage {
    message_id: number;
    from?: TelegramUser;
    chat: TelegramChat;
    text?: string;
    caption?: string;
    entities?: MessageEntity[];
    caption_entities?: MessageEntity[];
  }
  
  interface CallbackQuery {
    id: string;
    from: TelegramUser;
    message?: TelegramMessage;
    data?: string;
  }
  
  interface TelegramUpdate {
    update_id: number;
    message?: TelegramMessage;
    callback_query?: CallbackQuery;
  }
  
  interface InlineKeyboardButton {
    text: string;
    callback_data?: string;
  }
  
  interface GroupData {
    enabled: boolean;
    whitelist: string[];
    violations: Record<string, number>; // user_id -> count
    groupName: string;
    language: "th" | "lo" | "en";
    pendingAction?: {
      userId: number;
      action: "add_url" | "remove_url";
      messageId: number;
    };
  }
  
  type Language = "th" | "lo" | "en";
  
  interface Translation {
    panel: {
      title: string;
      status: string;
      defense: string;
      active: string;
      offline: string;
      whitelist: string;
      domains: string;
      violations: string;
      detected: string;
      violators: string;
      users: string;
      version: string;
    };
    buttons: {
      enableShield: string;
      disableShield: string;
      viewWhitelist: string;
      addDomain: string;
      removeDomain: string;
      statistics: string;
      unmuteAll: string;
      refresh: string;
      back: string;
      resetStats: string;
      delete: string;
      changeLang: string;
    };
    messages: {
      accessDenied: string;
      adminOnly: string;
      shieldActivated: string;
      shieldDeactivated: string;
      syntax: string;
      alreadyInWhitelist: string;
      added: string;
      notFound: string;
      deleted: string;
      statsReset: string;
      unmuted: string;
    };
    start: {
      title: string;
      initializing: string;
      ready: string;
      quickStart: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
      commands: string;
      panelDesc: string;
      addUrlDesc: string;
      removeUrlDesc: string;
    };
    whitelist: {
      title: string;
      total: string;
      empty: string;
      allBlocked: string;
    };
    stats: {
      title: string;
      total: string;
      noViolations: string;
      systemNormal: string;
    };
    addUrl: {
      title: string;
      syntax: string;
      examples: string;
      prompt: string;
      cancel: string;
    };
    removeUrl: {
      title: string;
      prompt: string;
      cancel: string;
    };
    violation: {
      title: string;
      blocked: string;
      user: string;
      count: string;
      status: string;
      muted: string;
      adminHint: string;
    };
  }

  export type { TelegramUser, TelegramChat, MessageEntity, TelegramMessage, CallbackQuery, TelegramUpdate, InlineKeyboardButton, GroupData, Language, Translation };