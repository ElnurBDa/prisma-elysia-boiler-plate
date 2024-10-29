import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import { prisma } from "./lib/db";
import { UserModel } from "./lib/models/user.model";

const app = new Elysia()
  .use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }))
  .use(swagger())
  .decorate("dbService", prisma)
  .get("/", ({ redirect }) => redirect("/swagger"))
  .group("users", (app) => app
    .get("/", ({ dbService }) => {
      return dbService.user.findMany();
    }, {
      response: t.Array(UserModel)
    })
    .get("/:id", ({ dbService, params }) => {
      return dbService.user.findUnique({
        where: {
          id: params.id
        }
      });
    }, {
      response: t.Nullable(UserModel),
      params: t.Object({
        id: t.String()
      })
    })
    .post("/", ({ dbService, body }) => {
      return dbService.user.create({
        data: body
      });
    }, {
      response: UserModel,
      body: UserModel
    })
    .put("/:id", ({ dbService, params, body }) => {
      return dbService.user.update({
        where: {
          id: params.id
        },
        data: body
      });
    },
      {
        response: UserModel,
        params: t.Object({
          id: t.String()
        }),
        body: t.Partial(UserModel)
      })
    .delete("/:id", ({ dbService, params }) => {
      return dbService.user.delete({
        where: {
          id: params.id
        }
      });
    }, {
      response: UserModel,
      params: t.Object({
        id: t.String()
      })
    }))
  .listen(3000);

console.log(
  `http://${app.server?.hostname}:${app.server?.port}`
);
