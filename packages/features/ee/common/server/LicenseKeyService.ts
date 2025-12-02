// packages/features/ee/common/server/LicenseKeyService.ts

export enum UsageEvent {
  BOOKING = "booking",
  USER = "user",
}

export interface ILicenseKeyService {
  incrementUsage(usageEvent?: UsageEvent): Promise<any>;
  checkLicense(): Promise<boolean>;
}

class LicenseKeyService implements ILicenseKeyService {
  private readonly licenseKey: string;
  private readonly signatureToken: string | null;

  private constructor(licenseKey: string, signatureToken: string | null) {
    this.licenseKey = licenseKey;
    this.signatureToken = signatureToken;
  }

  // Always create a working instance, but override methods
  public static async create(): Promise<ILicenseKeyService> {
    return new LicenseKeyService("DEV-OVERRIDE", null);
  }

  // 🔑 Always accept any license key
  public static async validateLicenseKey(_licenseKey: string): Promise<boolean> {
    return true;
  }

  // 🚀 Skip usage tracking
  async incrementUsage(_usageEvent?: UsageEvent) {
    return Promise.resolve({ ok: true });
  }

  // ✅ Always report license as valid
  async checkLicense(): Promise<boolean> {
    return true;
  }
}

// No-op service (kept for compatibility)
export class NoopLicenseKeyService implements ILicenseKeyService {
  async incrementUsage(_usageEvent?: UsageEvent): Promise<any> {
    return Promise.resolve({ ok: true });
  }
  async checkLicense(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export class LicenseKeySingleton {
  private static instance: ILicenseKeyService | null = null;

  private constructor() {}

  // ✅ Keep param optional to avoid build errors
  public static async getInstance(_deploymentRepo?: any): Promise<ILicenseKeyService> {
    if (!LicenseKeySingleton.instance) {
      LicenseKeySingleton.instance = await LicenseKeyService.create();
    }
    return LicenseKeySingleton.instance;
  }
}

export default LicenseKeyService;
