import AppWrapper from "components/AppWrapper/AppWrapper";
import CmsLoginWrapper from "components/CmsLoginWrapper/CmsLoginWrapper";

export default function MainCMSLayout({ children }) {
  return (
    <AppWrapper color="green">
      <CmsLoginWrapper color={"green"}>{children}</CmsLoginWrapper>
    </AppWrapper>
  );
}
