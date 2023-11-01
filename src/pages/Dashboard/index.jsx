import { Table } from "ochom-react-components";
import { SmoothBox } from "../../common/styled";

export default function Dashboard() {
  return (
    <SmoothBox>
      <Table
        sx={{ p: 3 }}
        columns={[]}
        data={[]}
        showSearch
        onRowClicked={() => {}}
      />
    </SmoothBox>
    
  );
}
