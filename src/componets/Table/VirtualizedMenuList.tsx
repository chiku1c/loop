import { FC } from 'react';
import { ListChildComponentProps } from 'react-window';
import { MenuProps } from '@mui/material/Menu'; // Use MenuProps from @mui/material/Menu



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
interface CustomMenuProps extends MenuProps {
  ListboxComponent?: React.ComponentType<any>;
}


export const VirtualizedMenuList: FC<ListChildComponentProps> = ({ style }) => {
  return <div style={style}>Menu Item</div>; 
};


export const menuProps: CustomMenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    ListboxComponent: VirtualizedMenuList,
    open: false
};