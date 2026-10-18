import { defineField, defineType } from 'sanity';

export const menuCategoryType = defineType({
  name: 'menuCategory',
  title: 'Categorías de Carta (Bebidas / Snacks)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la categoría (ej: Bebidas, Cervezas, Snacks)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Emoji o Ícono (ej: 🍹, 🍺, 🍟)',
      type: 'string',
    }),
  ],
});