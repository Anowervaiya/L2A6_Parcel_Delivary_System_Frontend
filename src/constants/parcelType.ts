

export const parcelTypes = [
  { label: 'Small Box', value: 'smallBox' },
  { label: 'Medium Box', value: 'mediumBox' },
  { label: 'Large Box', value: 'largeBox' },
  { label: 'Envelope', value: 'envelope' },
  { label: 'Pouch', value: 'pouch' },
  { label: 'Tube', value: 'tube' },
  { label: 'Crate', value: 'crate' },
  { label: 'Pallet', value: 'pallet' },
  { label: 'Fragile Goods', value: 'fragileGoods' },
  { label: 'Perishable Goods', value: 'perishableGoods' },
  { label: 'Hazardous Materials', value: 'hazardousMaterials' },
  { label: 'Oversized', value: 'oversized' },
  { label: 'Irregular Shape', value: 'irregularShape' },
  { label: 'Document', value: 'document' },
];

export const statusColors: any = {
  REQUESTED: 'text-blue-500', // Using Tailwind CSS classes for example
  APPROVED: 'text-yellow-500',
  DISPATCHED: 'text-cyan-500',
  CANCELLED: 'text-red-500',
  IN_TRANSIT: 'text-purple-500',
  DELIVERED: 'text-green-500',
};