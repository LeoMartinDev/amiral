import {
  Center,
  createStyles,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  UnstyledButton,
} from '@mantine/core';
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useTableInstance,
} from '@tanstack/react-table';
import prettyBytes from 'pretty-bytes';
import { useEffect, useState } from 'react';
import { Icons } from 'tabler-icons-react';
import { format } from 'timeago.js';
import { Selector, ChevronDown, ChevronUp, Search } from 'tabler-icons-react';
import { Image } from '../core/api/images.types';
import listImages from '../core/api/images/list-images';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },

  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

const table = createTable().setRowType<Image>();

const defaultColumns = [
  table.createDataColumn(
    (row) => (row.repoTags?.[0] || '<none>:<none>').split(':')[0],
    {
      id: 'name',
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
      enableSorting: false,
    }
  ),
  table.createDataColumn(
    (row) => (row.repoTags?.[1] || '<none>:<none>').split(':')[1],
    {
      id: 'tag',
      cell: (info) => info.getValue(),
      header: () => <span>Tag</span>,
      enableSorting: false,
    }
  ),
  table.createDataColumn((row) => row.createdAt, {
    id: 'created',
    cell: (info) => {
      const createdAt = info.getValue();

      return format(createdAt);
    },
    header: () => <span>Created</span>,
    enableSorting: false,
  }),
  table.createDataColumn((row) => row.size, {
    id: 'size',
    cell: (info) => {
      const size = info.getValue();

      return prettyBytes(size);
    },
    header: () => <span>Size</span>,
    enableSorting: true,
    sortingFn: 'basic',
  }),
];

export default function Images() {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
  const instance = useTableInstance(table, {
    data: images,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const getImages = async () => {
    const images = await listImages();

    setImages(() => images);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await getImages();
      } catch (error) {
        console.error(error);
      }
    };

    initialize();
  }, []);

  return (
    <ScrollArea
      sx={{ flex: 1, height: '100%' }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: '100%' }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={classes.th}
                >
                  {
                    header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <UnstyledButton
                        onClick={header.column.getToggleSortingHandler()}
                        className={classes.control}
                      >
                        <Group position="apart">
                          <Text weight={500} size="sm">
                            {header.renderHeader()}
                          </Text>
                          <Center>
                            {header.column.getIsSorted()
                              ? ChevronUp({ size: 14 })
                              : ChevronDown({ size: 14 })}
                          </Center>
                        </Group>
                      </UnstyledButton>
                    ) : (
                      <Text weight={500} size="sm">
                        {header.renderHeader()}
                      </Text>
                    )
                    // <div
                    //   {...{
                    //     className: header.column.getCanSort()
                    //       ? 'cursor-pointer select-none'
                    //       : '',
                    //     onClick: header.column.getToggleSortingHandler(),
                    //   }}
                    // >
                    //   {// header.renderHeader()}
                    //   {{
                    //     asc: ' 🔼',
                    //     desc: ' 🔽',
                    //   }[header.column.getIsSorted() as string] ?? null}
                    // </div>
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
