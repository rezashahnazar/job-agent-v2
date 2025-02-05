import { NextRequest } from "next/server";
import { UserController } from "@/controllers/user.controller";

export const GET = () => UserController.getUsers();
export const POST = (req: NextRequest) => UserController.createUser(req);
