export const RoleOptions = [
    'admin',
    'user',
    'staff',
    'manager',

];

export const StatusOptions = [
    'active',
    'inactive',
    'deleted',
];


export type Status = 'active'
    | 'banned'
    | 'inactive'
    | 'deleted'


export interface Role {
    id: number;
    name: string;
}

export interface Profile {
    id: string;
    avatar: string;
    first_name: string;
    last_name: string;
    is_verified: boolean;

}

export interface NotificationProps {
    id: number;
    title: string;
    message: string;
    avatar?: null | string;
    type: string;
    created_at: string;
    is_unread: boolean;
}

export interface User {
    id: string;
    username: string;
    password?: string;
    token?: string;
    roles: Role[];
}

export interface Error {
    email?: string | null;
    name: string | null;
    role?: string | null;
    status?: string | null;
    company: string | null;
    password?: string | null;
    submit: string | null;
}
export interface AppModalProps {
    children: React.ReactNode;
    handleClose: () => void;
    open: boolean;
}
export interface UserModalProps {
    data?: any;
    handleClose?: () => void;
}


