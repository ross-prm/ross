import React from "react";
import { Icon, useTheme } from "@ui-kitten/components";

export const ArrowIosBackIcon = style => (
  <Icon {...style} name="arrow-ios-back" />
);

export const DoneAllIcon = style => {
  const theme = useTheme();
  return (
    <Icon
      {...style}
      width={16}
      height={16}
      fill={theme["color-primary-default"]}
      name="done-all"
    />
  );
};

export const SearchIcon = style => <Icon {...style} name="search" />;

export const PersonAddIcon = style => <Icon {...style} name="person-add" />;

