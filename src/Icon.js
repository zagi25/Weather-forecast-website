import React from "react";
import * as Icons from "react-icons/wi";

export const DynamicWiIcon = ({ name, className }) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    return <Icons.WiCloud />;
  }

  return <IconComponent className={className} />;
};
