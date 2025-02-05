import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import {
  createSuccessResponse,
  createErrorResponse,
  handlePrismaError,
} from "@/utils/api-response";

const prisma = new PrismaClient();

export class UserController {
  private static schema = {
    create: z.object({
      email: z.string().email(),
      firstName: z.string().min(2).nullable(),
      lastName: z.string().min(2).nullable(),
    }),
    update: z
      .object({
        email: z.string().email(),
        firstName: z.string().min(2).nullable(),
        lastName: z.string().min(2).nullable(),
        isActive: z.boolean().optional(),
        isEmailVerified: z.boolean().optional(),
      })
      .partial(),
  };

  static async getUsers() {
    try {
      const users = await prisma.user.findMany({
        orderBy: [
          { createdAt: "desc" }, // Primary sort by creation date
        ],
      });
      return createSuccessResponse({
        data: users,
        message: "User list fetched successfully",
      });
    } catch (error) {
      return handlePrismaError(error);
    }
  }

  static async createUser(req: NextRequest) {
    try {
      const body = await req.json();
      const validationResult = this.schema.create.safeParse(body);

      if (!validationResult.success) {
        return createErrorResponse({
          code: "VALIDATION_ERROR",
          message: validationResult.error.message,
          status: 400,
        });
      }

      const user = await prisma.user.create({
        data: validationResult.data,
      });

      return createSuccessResponse({
        data: user,
        message: "User created successfully",
        status: 201,
      });
    } catch (error) {
      return handlePrismaError(error);
    }
  }

  static async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        return createErrorResponse({
          code: "USER_NOT_FOUND",
          message: "User not found",
          status: 404,
        });
      }

      return createSuccessResponse({
        data: user,
        message: "User fetched successfully",
      });
    } catch (error) {
      return handlePrismaError(error);
    }
  }

  static async updateUser(id: string, req: NextRequest) {
    try {
      const body = await req.json();
      const validationResult = this.schema.update.safeParse(body);

      if (!validationResult.success) {
        return createErrorResponse({
          code: "VALIDATION_ERROR",
          message: validationResult.error.message,
          status: 400,
        });
      }

      const user = await prisma.user.update({
        where: { id },
        data: validationResult.data,
      });

      return createSuccessResponse({
        data: user,
        message: "User updated successfully",
      });
    } catch (error) {
      return handlePrismaError(error);
    }
  }

  static async deleteUser(id: string) {
    try {
      const user = await prisma.user.delete({ where: { id } });

      return createSuccessResponse({
        data: user,
        message: "User deleted successfully",
        status: 204,
      });
    } catch (error) {
      return handlePrismaError(error);
    }
  }
}
