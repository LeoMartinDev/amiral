import {
  Center,
  createStyles,
  Group,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { Column, CoreHeader, SortDirection } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Selector } from 'tabler-icons-react';

// TODO unstyled button has style...

const useStyles = createStyles((theme) => ({
  columnHeader: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },

  columnHeaderControl: {
    '&:hover': {
      backgroundColor: theme.colors.gray[2],
    },
  },

  th: {
    padding: '0!important',
  },
}));

export type ImagesTableColumnHeaderProps = {
  isSorted: false | SortDirection;
  size: number;
  canSort: boolean;
  isPlaceholder: boolean;
  colSpan: number;
  renderHeader: CoreHeader<any>['renderHeader'];
  toggleSorting: Column<any>['toggleSorting'];
};

export default function ImagesTableColumnHeader({
  isSorted,
  size,
  canSort,
  isPlaceholder,
  colSpan,
  renderHeader,
  toggleSorting,
}: ImagesTableColumnHeaderProps) {
  const { classes, cx } = useStyles();

  const getSortIcon = (isSorted: ImagesTableColumnHeaderProps['isSorted']) => {
    if (isSorted === false) {
      return Selector;
    }

    if (isSorted === 'asc') {
      return ChevronUp;
    }

    return ChevronDown;
  };

  const SortIcon = getSortIcon(isSorted);

  return (
    <th
      {...{
        colSpan: colSpan,
        className: classes.th,
        style: {
          width: size,
        },
      }}
    >
      {isPlaceholder ? null : canSort ? (
        <UnstyledButton
          onClick={() => toggleSorting()}
          className={cx(classes.columnHeader, classes.columnHeaderControl)}
        >
          <Group position="apart" noWrap={true}>
            <Center>
              <Text size="sm">{renderHeader()}</Text>
            </Center>
            <Center>
              <SortIcon size={14} />
            </Center>
          </Group>
        </UnstyledButton>
      ) : (
        <Text size="sm" className={classes.columnHeader}>
          {renderHeader()}
        </Text>
      )}
    </th>
  );
}
