// packages/trpc/server/routers/viewer/deploymentSetup/validateLicense.handler.ts

import type { TrpcSessionUser } from "../../../types";
import type { TValidateLicenseInputSchema } from "./validateLicense.schema";

type ValidateLicenseOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TValidateLicenseInputSchema;
};

// DEV OVERRIDE: always accept any license key
export const validateLicenseHandler = async ({ input }: ValidateLicenseOptions) => {
  return {
    valid: true,
    message: "License key is valid (DEV override)",
  };
};
