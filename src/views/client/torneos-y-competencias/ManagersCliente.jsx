import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import usersManagersService from '../../../services/api/managers/usersManagerService';

const ODD_OPACITY = 0.1;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#e5e5e5",
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha("#757575", ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        "#757575",
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          "#757575",
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            "#757575",
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

export default function ManagersCliente() {
  const { data, loading } = useDemoData({
    dataSet: 'Employee',
    rowLength: 200,
  });

  const [managers , setManagers] = React.useState([]);

  const getManagers = async () => {
    
    const response = await usersManagersService.getManagers();
    setManagers(response);

  }

  React.useEffect(() => {
    getManagers();
  }, []);

  console.log("MANAGERS ",managers);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <StripedDataGrid
        loading={loading}
        {...data}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />
    </div>
  );
}
