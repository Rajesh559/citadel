import { getIndicatorColor } from '@/app/utils/colors';
import { handleClientSidePagination } from '@/app/utils/pagination';
import { ColumnDef, DataTable } from 'dms-common-ux/components/data-table';
import { Dialog } from 'dms-common-ux/components/dialog';
import { Progress } from 'dms-common-ux/components/progress';
import { PropsWithChildren, useEffect, useState } from 'react';

interface Detail {
  title: string;
  status: 'New' | 'In progress' | 'Done';
  complete_percent: number;
}

interface FeatureTableProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  details?: Detail[];
  statusColors?: { color: string; status: 'New' | 'In progress' | 'Done' }[];
}

// Cell renderer for the "NAME" column
const NameCell: React.FC<{ row: { original: Detail } }> = ({ row }) => {
  const value = row.original.title;
  return <div className="w-full p-1.5">{value}</div>;
};

// Cell renderer for the "PROGRESS" column
const ProgressCell: React.FC<{ row: { original: Detail } }> = ({ row }) => {
  const value = row.original.complete_percent;
  return (
    <div className="flex w-24 items-center md:w-40">
      <Progress value={value ?? 0} minValue={0} maxValue={100} indicatorColor={getIndicatorColor(value ?? 0)} />
      <span className="ml-2 w-14 text-left">{`${value}%`}</span>
    </div>
  );
};

const FeatureTable: React.FC<PropsWithChildren<FeatureTableProps>> = ({ isOpen, setIsOpen, details }) => {
  const [isLoading] = useState(false);
  const [pagination, setPagination] = useState<{
    page: number;
    count: number;
    search?: string;
  }>({
    page: 1,
    count: 100,
    search: '',
  });

  const [columnData, setColumnData] = useState<{
    data: Detail[];
    total: number;
  }>({ data: [], total: 0 });

  useEffect(() => {
    const { page, count, search } = pagination;
    if (details?.length) {
      const { data: result, totalMatchCount } = handleClientSidePagination(details, {
        count,
        page,
        ...(search && {
          searchQueryFn: i => i.title.toLowerCase().includes(search.toLowerCase()),
        }),
      });
      setColumnData({ data: result, total: totalMatchCount });
    }
  }, [pagination, details]);

  const columns: ColumnDef<Detail>[] = [
    {
      accessorKey: 'name',
      header: 'NAME',
      cell: NameCell,
    },
    {
      accessorKey: 'progress',
      header: 'PROGRESS',
      cell: ProgressCell,
    },
  ];

  return (
    <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="FEATURES" showCloseButton={true}>
      <DataTable
        columns={columns}
        data={columnData.data}
        getData={pageData => {
          setPagination(pageData);
        }}
        pagination={pagination}
        totalCount={columnData.total}
        onSelectedData={() => {}}
        isLoading={isLoading}
        tableClassName="min-h-125 max-h-125 overflow-auto"
        enablePagination={false}
      />
    </Dialog>
  );
};

export default FeatureTable;
