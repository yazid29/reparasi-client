import {z} from "zod";
export const userSchema = z.object({
    username : z.string().min(8,"Minimum 8 Karakter"),
    password : z.string().min(5,"Minimum 5 Karakter"),
    // roles : z.array(z.string()),
    roles: z.string()
})