// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { artistType } from "./artist";
import { genreType } from "./genre";
import { languageType } from "./language";
import { songType } from "./song";
import { couponType } from "./coupon";
import { tableType } from "./table";
import { menuItemType } from "./menuItem";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artistType, genreType, languageType, songType, couponType, tableType, menuItemType],
};