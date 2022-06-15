import { createStyles, ScrollArea, Table } from '@mantine/core';
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useTableInstance,
} from '@tanstack/react-table';
import prettyBytes from 'pretty-bytes';
import { useState } from 'react';
import { format } from 'timeago.js';

import { Image } from '../../core/api/images/images.types';
import ColumnHeader from './ImagesTableColumnHeader';

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

  cell: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
      size: 200,
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
  table.createDataColumn((row) => row.id, {
    id: 'imageId',
    cell: (info) => {
      const sha256 = info.getValue();

      return sha256.split(':')[1].slice(0, 12);
    },
    header: () => <span>Image ID</span>,
    enableSorting: false,
  }),
  table.createDataColumn((row) => row.createdAt, {
    id: 'created',
    cell: (info) => {
      const createdAt = info.getValue();

      return format(createdAt);
    },
    header: () => <span>Created</span>,
    enableSorting: true,
    sortingFn: 'datetime',
    size: 170,
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

export type ImagesTableProps = {
  images: Image[];
};

export default function ImagesTable({ images }: ImagesTableProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <ScrollArea
      sx={{ flex: 1, height: '100%' }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ tableLayout: 'fixed' }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <ColumnHeader
                  {...{
                    key: header.id,
                    isSorted: header.column.getIsSorted(),
                    size: header.column.getSize(),
                    canSort: header.column.getCanSort(),
                    isPlaceholder: header.isPlaceholder,
                    colSpan: header.colSpan,
                    renderHeader: () => header.renderHeader(),
                    toggleSorting: () => header.column.toggleSorting(),
                  }}
                />
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={classes.cell}>
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
