// import { useRecoilState } from 'recoil';
// import itemsState, { Item } from '../atoms/items';

// interface IAddItem {
//   title: string;
//   category: string;
// }

// interface IUseItemsHook {
//   items: Item[];
//   addItem: (data: IAddItem) => void;
//   toggleItem: (key: string) => void;
// }

// export default (): IUseItemsHook => {
//   const [items, setItems] = useRecoilState(itemsState);

//   function addItem({ title, category }: IAddItem): void {
//     const item = new Item(title, category);

//     setItems(state => [...state, item]);
//   }

//   function toggleItem(key: string): void {
//     setItems(state =>
//       state.map(item => {
//         if (item.key === key) {
//           Object.assign(item, { selected: !item.selected });
//         }

//         return item;
//       }),
//     );
//   }

//   return { items, addItem, toggleItem };
// };
