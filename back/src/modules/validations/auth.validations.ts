import { z } from 'zod';
import { userSchema } from './user.validations'

export const authSchema = z.object({
  email: userSchema.shape.email,
  password: userSchema.shape.password,
}).strict({ message: 'Somente os campos: email, password são permitidos. Campos extras não são aceitos.' });
;

