import Text from "components/Text/Text";
import React from "react";
import { AppTextType } from "utils/types/init";

type Props = {
  value: AppTextType;
  className?: string;
};

function AppText(props: Props) {
  const { value, className = "" } = props;
  const { tag, text } = value;

  return (
    <Text tag={tag} className={className}>
      {text}
    </Text>
  );
}

export default AppText;
