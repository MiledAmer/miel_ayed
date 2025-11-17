export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'regular' | 'special';
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Wildflower Honey',
    description: 'Pure organic wildflower honey with natural flavors',
    price: 25.99,
    image: '/wildflower-honey-jar.png',
    category: 'regular',
  },
  {
    id: '2',
    title: 'Acacia Honey',
    description: 'Delicate acacia honey, light and aromatic',
    price: 32.50,
    image: '/acacia-honey-bottle.jpg',
    category: 'special',
  },
  {
    id: '3',
    title: 'Lavender Honey',
    description: 'Infused with lavender for a unique floral taste',
    price: 28.75,
    image: '/lavender-honey-premium.jpg',
    category: 'special',
  },
  {
    id: '4',
    title: 'Raw Honey',
    description: 'Unprocessed and unfiltered raw honey',
    price: 22.00,
    image: '/raw-organic-honey.jpg',
    category: 'regular',
  },
  {
    id: '5',
    title: 'Manuka Honey',
    description: 'Premium manuka honey from New Zealand',
    price: 45.00,
    image: '/manuka-honey-jar.png',
    category: 'special',
  },
  {
    id: '6',
    title: 'Clover Honey',
    description: 'Sweet clover honey with smooth texture',
    price: 19.99,
    image: '/clover-honey-natural.jpg',
    category: 'regular',
  },
  {
    id: '7',
    title: 'Orange Blossom Honey',
    description: 'Citrus-infused honey with bright flavors',
    price: 30.00,
    image: '/orange-blossom-honey.jpg',
    category: 'regular',
  },
  {
    id: '8',
    title: 'Chestnut Honey',
    description: 'Rich and dark chestnut honey',
    price: 35.50,
    image: '/chestnut-honey-dark.jpg',
    category: 'regular',
  },
  {
    id: '9',
    title: 'Sunflower Honey',
    description: 'Bright and energetic sunflower honey blend',
    price: 24.50,
    image: '/sunflower-honey.jpg',
    category: 'special',
  },
  {
    id: '10',
    title: 'Eucalyptus Honey',
    description: 'Refreshing eucalyptus-infused honey',
    price: 29.99,
    image: '/eucalyptus-honey.jpg',
    category: 'special',
  },
  {
    id: '11',
    title: 'Buckwheat Honey',
    description: 'Deep, rich buckwheat honey with molasses notes',
    price: 33.75,
    image: '/buckwheat-honey.jpg',
    category: 'special',
  },
  {
    id: '12',
    title: 'Thyme Honey',
    description: 'Aromatic thyme honey with herbal notes',
    price: 26.99,
    image: '/thyme-honey.jpg',
    category: 'special',
  },
];
