// src/sanity/schemaTypes/menuItem.ts
import { defineField, defineType } from 'sanity';

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Bebidas y Snacks',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la bebida o snack',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: '🍹 Bebidas / Tragos', value: 'Bebidas' },
          { title: '🍺 Cervezas', value: 'Cervezas' },
          { title: '🍸 Cócteles', value: 'Cocteles' },
          { title: '🍟 Snacks / Comida', value: 'Snacks' },
        ],
      },
      initialValue: 'Bebidas',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción breve',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'price',
      title: 'Precio (S/)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Imagen referencial del producto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'available',
      title: '¿Disponible en barra/cocina?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});