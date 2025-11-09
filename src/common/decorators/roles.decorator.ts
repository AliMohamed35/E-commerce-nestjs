import { SetMetadata } from '@nestjs/common';
export const ROLES = 'ROLES';
// export const Roles = Reflector.createDecorator<string[]>();
export const Roles = (value: string[]) => SetMetadata(ROLES, value);
