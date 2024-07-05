import { User } from '../types/user';
import { v4 as uuid } from 'uuid';
export const comparePassword = (password: string, hash: string) => true;

export const hashPassword = (password: string) => password;

export const createAvatarUrl = () => 'https://api.dicebear.com/8.x/pixel-art/svg?background=%23ebf4ff&radius=50&size=80&colorful=true&top=random&clothes=random&style=shiny&seed=' + uuid();


export const fullName = (user: User) => `${user.profile.first_name} ${user.profile.last_name}`;

