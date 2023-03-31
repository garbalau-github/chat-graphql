import { HttpLink } from '@apollo/client';
import { UserType, ChannelType } from '../types';

export const API = new HttpLink({
  uri: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
});

export const users: UserType[] = [
  { value: 'Joyse', label: 'Joyse' },
  { value: 'Sam', label: 'Sam' },
  { value: 'Russell', label: 'Russell' },
];

export const channels: ChannelType[] = [
  { value: 'General', label: 'General Channel' },
  { value: 'Technology', label: 'Technology Channel' },
  { value: 'LGTM', label: 'LGTM Channel' },
];
