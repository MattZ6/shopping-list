// import { atom } from 'recoil';

export class Item {
  readonly key: string;

  selected?: boolean;

  constructor(public title: string, public category: string) {
    this.key = Date.now().toString();
  }
}

// export default atom<Item[]>({
//   key: 'ITEMS_STATE',
//   default: [
//     new Item('Papel higiênico', 'Banheiro'),
//     new Item('Creme dental', 'Banheiro'),
//     new Item('Shampoo Nanda', 'Banheiro'),
//     new Item('Shampoo Mat', 'Banheiro'),
//     new Item('Pac arroz', 'Cozinha'),
//     new Item('Café', 'Cozinha'),
//     new Item('Filtro de café', 'Cozinha'),
//     new Item('Sarchicha', 'Cozinha'),
//     new Item('Batata palha', 'Cozinha'),
//     new Item('2kg poteti', 'Cozinha'),
//     new Item('Bananas', 'Cozinha'),
//   ],
// });
