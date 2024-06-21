import { BooksTableActions } from '@/components/table/BooksTableActions';

export const BooksTableRow = () => {
  return (
    <tr>
      <td>123456789</td>
      <td>Lalka</td>
      <td>Bolesław Prus</td>
      <td>
        <BooksTableActions />
      </td>
    </tr>
  );
};
