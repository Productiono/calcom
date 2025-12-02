"use client";

import type { AriaRole, ComponentType } from "react";
import React, { Fragment } from "react";

type LicenseRequiredProps = {
  as?: keyof JSX.IntrinsicElements | "";
  className?: string;
  role?: AriaRole | undefined;
  children: React.ReactNode;
};

// DEV OVERRIDE: Always render children, skip license checks
const LicenseRequired = ({ children, as = "", ...rest }: LicenseRequiredProps) => {
  const Component = as || Fragment;
  return <Component {...rest}>{children}</Component>;
};

export const withLicenseRequired =
  <T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) =>
  // eslint-disable-next-line react/display-name
  (hocProps: T) =>
    (
      <div>
        <LicenseRequired>
          <Component {...hocProps} />
        </LicenseRequired>
      </div>
    );

export default LicenseRequired;
