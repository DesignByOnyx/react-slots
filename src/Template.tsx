import { ReactElement } from "react";
import { DEFAULT_SLOT_NAME } from "./utils";

type TemplateProps = {
  slot: string;
};

const Template: React.FC<TemplateProps> = ({ children }) =>
  children as ReactElement;
Template.defaultProps = { slot: DEFAULT_SLOT_NAME };

export default Template;
