import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ErrorResponse, SuccessResponse } from "@/types/api";

type SuccessResponseOptions = {
  data?: unknown;
  message?: string;
  status?: number;
};

type ErrorResponseOptions = {
  code: string;
  message: string;
  status?: number;
};

export const createSuccessResponse = ({
  data,
  message = "Operation successful",
  status = 200,
}: SuccessResponseOptions) => {
  return NextResponse.json(
    {
      success: true,
      data,
      messages: [message],
    } as SuccessResponse,
    { status }
  );
};

export const createErrorResponse = ({
  code,
  message,
  status = 400,
}: ErrorResponseOptions) => {
  return NextResponse.json(
    {
      success: false,
      code,
      messages: [message],
    } as ErrorResponse,
    { status }
  );
};

export const handlePrismaError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle unique constraint violations
    if (error.code === "P2002") {
      const field = (error.meta?.target as string[])[0];
      return createErrorResponse({
        code: "DUPLICATE_ENTRY",
        message: `Entry with this ${field} already exists`,
        status: 409,
      });
    }

    return createErrorResponse({
      code: `PRISMA_${error.code}`,
      message: error.message,
      status: 400,
    });
  }

  return createErrorResponse({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
    status: 500,
  });
};
