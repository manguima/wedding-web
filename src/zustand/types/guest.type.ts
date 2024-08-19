// Tipos para as propriedades que você recebe
export type Guest = {
  id: string;
  createdAt: string;
  name: string;
  isHost: boolean;
  isOldYear: boolean;
  familyId: string;
};

export type MessageProps = {
  id: string;
  createdAt: string;
  message: string;
  familyId: string;
};

export type CodeProps = {
  id: string;
  createdAt: string;
  total: number;
  codeKey: string;
  active: boolean;
};

export type GuestProps = {
  codeKey: string;
  phone: string;
  guests: Guest[];
  email: string;
  invite: CodeProps;
  id: string;
  createdAt: string;
  messages: MessageProps[];
  music: any[];
};

export type MainState = {
  code: CodeProps;
  guests: GuestProps | null;
  loading: boolean;
  validateCode: (code: string) => Promise<ApiResult>;
  saveGuest: (guest: Partial<GuestProps>) => Promise<ApiResult>;
  saveMessage: (message: Partial<MessageProps>) => Promise<ApiResult>;
  updateCode: (data: CodeProps) => void;
  updateGuests: (data: GuestProps) => void;
};

export type ApiResult = {
  success: boolean;
  response?: any;
  error?: any;
};
