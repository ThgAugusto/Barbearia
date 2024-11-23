import { z } from 'zod';
import { userSchema } from './user.validations'

export const authSchema = z.object({
  email: userSchema.shape.email,  
  password: userSchema.shape.password, 
});
