export type DeltaChatEvent = {
  ts: number;
  event_type: string;
  data1: string | number | undefined;
  data2: string | number | undefined;
};

export type DeclarationField = {
  label: string;
  type: "string" | "int";
  nullable: boolean;
};

export type EventDeclaration = {
  data1?: DeclarationField;
  data2?: DeclarationField;
};

const INFO_FIELD: DeclarationField = {
  label: "info",
  type: "string",
  nullable: false,
};
const OPTIONAL_INFO_FIELD: DeclarationField = {
  label: "info",
  type: "string",
  nullable: true,
};

const PATH_FIELD: DeclarationField = {
  label: "path",
  type: "string",
  nullable: false,
};
const CHAT_ID_FIELD: DeclarationField = {
  label: "chat id",
  type: "int",
  nullable: false,
};
const MSG_ID_FIELD: DeclarationField = {
  label: "msg id",
  type: "int",
  nullable: false,
};
const TIMER_FIELD: DeclarationField = {
  label: "timer",
  type: "int",
  nullable: false,
};
const CONTACT_ID_FIELD: DeclarationField = {
  label: "contact id",
  type: "int",
  nullable: false,
};
const OPTIONAL_CONTACT_ID_FIELD: DeclarationField = {
  label: "contact id",
  type: "int",
  nullable: true,
};
const PROGRESS_FIELD: DeclarationField = {
  label: "progress",
  type: "int",
  nullable: false,
};
const WEBXDC_SERIAL_FIELD: DeclarationField = {
  label: "serial",
  type: "int",
  nullable: false,
};

export type EventDeclarations = { [name: string]: EventDeclaration };
export const eventDeclarations: EventDeclarations = {
  Info: {
    data2: INFO_FIELD,
  },
  SmtpConnected: {
    data2: INFO_FIELD,
  },
  ImapConnected: {
    data2: INFO_FIELD,
  },
  SmptMessageSent: {
    data2: INFO_FIELD,
  },
  ImapMessageDeleted: {
    data2: INFO_FIELD,
  },
  ImapMessageMoved: {
    data2: INFO_FIELD,
  },
  NewBlobFile: {
    data2: PATH_FIELD,
  },
  DeletedBlobFile: {
    data2: PATH_FIELD,
  },
  Warning: {
    data2: INFO_FIELD,
  },
  Error: {
    data2: INFO_FIELD,
  },
  ErrorSelfNotInGroup: {
    data2: INFO_FIELD,
  },
  MsgsChanged: {
    data1: CHAT_ID_FIELD,
    data2: MSG_ID_FIELD,
  },
  IncomingMsg: {
    data1: CHAT_ID_FIELD,
    data2: MSG_ID_FIELD,
  },
  MsgsNoticed: {
    data1: CHAT_ID_FIELD,
  },
  MsgDelivered: {
    data1: CHAT_ID_FIELD,
    data2: MSG_ID_FIELD,
  },
  MsgFailed: {
    data1: CHAT_ID_FIELD,
    data2: MSG_ID_FIELD,
  },
  MsgRead: {
    data1: CHAT_ID_FIELD,
    data2: MSG_ID_FIELD,
  },
  ChatModified: {
    data1: CHAT_ID_FIELD,
  },
  ChatEmphemeralTimerModified: {
    data1: CHAT_ID_FIELD,
    data2: TIMER_FIELD,
  },
  ContactsChanged: {
    data1: OPTIONAL_CONTACT_ID_FIELD,
  },
  LocationChanged: {
    data1: OPTIONAL_CONTACT_ID_FIELD,
  },
  ConfigureProgress: {
    data1: PROGRESS_FIELD,
    data2: OPTIONAL_INFO_FIELD,
  },
  ImexProgress: {
    data1: PROGRESS_FIELD,
  },
  ImexFileWritten: {
    data2: PATH_FIELD,
  },
  SecureJoinInviterProgress: {
    data1: CONTACT_ID_FIELD,
    data2: PROGRESS_FIELD,
  },
  SecureJoinJoinerProgress: {
    data1: CONTACT_ID_FIELD,
    data2: PROGRESS_FIELD,
  },
  ConnectivityChanged: {},
  SelfavatarChanged: {},
  WebxdcStatusUpdate: {
    data1: MSG_ID_FIELD,
    data2: WEBXDC_SERIAL_FIELD,
  },
};
