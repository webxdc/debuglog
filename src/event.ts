export type DeltaChatEvent = {
  ts: number;
  event_type: string;
  data1: string | number | undefined;
  data2: string | number | undefined;
};

export type DeclarationField = {
  label: string;
  type: "string" | "int";
};

export type EventDeclaration = {
  data1?: DeclarationField;
  data2?: DeclarationField;
};

const INFO_FIELD: DeclarationField = { label: "info", type: "string" };
const PATH_FIELD: DeclarationField = { label: "path", type: "string" };
const CHAT_ID_FIELD: DeclarationField = { label: "chat id", type: "int" };
const MSG_ID_FIELD: DeclarationField = { label: "msg id", type: "int" };
const TIMER_FIELD: DeclarationField = { label: "timer", type: "int" };
const CONTACT_ID_FIELD: DeclarationField = { label: "contact id", type: "int" };
const PROGRESS_FIELD: DeclarationField = { label: "progress", type: "int" };
const WEBXDC_SERIAL_FIELD: DeclarationField = { label: "serial", type: "int" };

export type EventDeclarations = { [name: string]: EventDeclaration };
export const eventDeclarations: EventDeclarations = {
  DC_EVENT_INFO: {
    data2: INFO_FIELD,
  },
  DC_EVENT_SMTP_CONNECTED: {
    data2: INFO_FIELD,
  },
  DC_EVENT_IMAP_CONNECTED: {
    data2: INFO_FIELD,
  },
  DC_EVENT_SMTP_MESSAGE_SENT: {
    data2: INFO_FIELD,
  },
  DC_EVENT_IMAP_MESSAGE_DELETED: {
    data2: INFO_FIELD,
  },
  DC_EVENT_IMAP_MESSAGE_MOVED: {
    data2: INFO_FIELD,
  },
  DC_EVENT_NEW_BLOB_FILE: {
    data2: PATH_FIELD,
  },
  DC_EVENT_DELETED_BLOB_FILE: {
    data2: PATH_FIELD,
  },
  DC_EVENT_WARNING: {
    data2: INFO_FIELD,
  },
  DC_EVENT_ERROR: {
    data2: INFO_FIELD,
  },
  DC_EVENT_ERROR_SELF_NOT_IN_GROUP: {
    data2: INFO_FIELD,
  },
  DC_EVENT_MSGS_CHANGED: {
    data1: CHAT_ID_FIELD,
    data2: MSG_ID_FIELD,
  },
  DC_EVENT_INCOMING_MSG: {
    data1: CHAT_ID_FIELD,
    data2: MSG_ID_FIELD,
  },
  DC_EVENT_MSGS_NOTICED: {
    data1: CHAT_ID_FIELD,
  },
  DC_EVENT_MSG_DELIVERED: {
    data1: CHAT_ID_FIELD,
    data2: MSG_ID_FIELD,
  },
  DC_EVENT_MSG_FAILED: {
    data1: CHAT_ID_FIELD,
    data2: MSG_ID_FIELD,
  },
  DC_EVENT_MSG_READ: {
    data1: CHAT_ID_FIELD,
    data2: MSG_ID_FIELD,
  },
  DC_EVENT_CHAT_MODIFIED: {
    data1: CHAT_ID_FIELD,
  },
  DC_EVENT_CHAT_EPHEMERAL_TIMER_MODIFIED: {
    data1: CHAT_ID_FIELD,
    data2: TIMER_FIELD,
  },
  DC_EVENT_CONTACTS_CHANGED: {
    data1: CONTACT_ID_FIELD,
  },
  DC_EVENT_LOCATION_CHANGED: {
    data1: CONTACT_ID_FIELD,
  },
  DC_EVENT_CONFIGURE_PROGRESS: {
    data1: PROGRESS_FIELD,
    data2: INFO_FIELD,
  },
  DC_EVENT_IMEX_PROGRESS: {
    data1: PROGRESS_FIELD,
  },
  DC_EVENT_IMEX_FILE_WRITTEN: {
    data2: PATH_FIELD,
  },
  DC_EVENT_SECUREJOIN_INVITER_PROGRESS: {
    data1: CONTACT_ID_FIELD,
    data2: PROGRESS_FIELD,
  },
  DC_EVENT_SECUREJOIN_JOINER_PROGRESS: {
    data1: CONTACT_ID_FIELD,
    data2: PROGRESS_FIELD,
  },
  DC_EVENT_CONNECTIVITY_CHANGED: {},
  DC_EVENT_SELFAVATAR_CHANGED: {},
  DC_EVENT_WEBXDC_STATUS_UPDATE: {
    data1: MSG_ID_FIELD,
    data2: WEBXDC_SERIAL_FIELD,
  },
};
