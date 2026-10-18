import { defineField, defineType } from 'sanity';

export const couponType = defineType({
  name: 'coupon',
  title: 'Cupones de Descuento',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Código del cupón (ej: PREVIA20)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'benefit',
      title: 'Beneficio / Descuento (ej: 20% dscto en el primer piqueo)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'durationMinutes',
      title: 'Tiempo de validez en minutos (1 hora = 60)',
      type: 'number',
      initialValue: 60,
    }),
    defineField({
      name: 'active',
      title: '¿Cupón activo?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});