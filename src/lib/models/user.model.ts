import { t } from "elysia";

export const UserModel = t.Object({
    id: t.Optional(t.String()),
    email: t.String(),
    name: t.Nullable(t.String()),
    createdAt: t.Optional(t.Date()),
    updatedAt: t.Optional(t.Date())
});