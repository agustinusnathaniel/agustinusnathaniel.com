enum MandatoryStringFieldKeys {
  title,
  description,
  id,
}
type MandatoryStringFieldsType = keyof typeof MandatoryStringFieldKeys;

enum OptionalStringFieldKeys {
  projectLink,
  repoLink,
  appStoreLink,
  playStoreLink,
  icon,
  date,
}
type OptionalStringFieldsType = keyof typeof OptionalStringFieldKeys;

enum OptionalBooleanFieldKeys {
  highlight,
  featured,
  published,
  sznmApps,
}
type OptionalBooleanFieldsType = keyof typeof OptionalBooleanFieldKeys;

export type ProjectType = { [key in MandatoryStringFieldsType]: string } &
  { [key in OptionalStringFieldsType]?: string } &
  { [key in OptionalBooleanFieldsType]?: boolean } & {
    stacks?: string[];
    contentHtml?: any;
  };
