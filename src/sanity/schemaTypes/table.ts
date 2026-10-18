import { defineField, defineType } from 'sanity';

export const tableType = defineType({
  name: 'table',
  title: 'Mesas',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Número o Nombre de Mesa (ej: Mesa 1, Box VIP 2)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacidad de personas (para reservas)',
      type: 'number',
      initialValue: 4,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'active',
      title: '¿Mesa disponible / habilitada?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});