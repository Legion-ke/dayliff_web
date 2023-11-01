import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import BarGraph from "../../common/bargraph";
import PieGraph from "../../common/piegraph";

export default function Dashboard() {
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = ["Jan", "Feb", "Mar", "May", "Jun", "Jul", "Aug"];
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
          <Card sx={{ width: 200 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: 20 }} variant="body1">
                6000
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Orders Completed
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: 20 }} variant="body1">
                200
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Drivers
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: 20 }} variant="body1">
                10000
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Vehicles
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: 20 }} variant="body1">
                100
              </Typography>

              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Routes
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: 20 }} variant="body1">
                600
              </Typography>

              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Returned Orders
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <Stack direction="row" width="100%" textAlign="center" spacing={2}>
        <BarGraph pData={pData} label={"Orders"} xLabels={xLabels} />

        <BarGraph pData={pData} label={"Routes"} xLabels={xLabels} />
      </Stack>
      <Stack direction="row" width="100%" textAlign="end" spacing={2}>
        <BarGraph pData={pData} label={"Return"} xLabels={xLabels} />

        <PieGraph />
      </Stack>
    </>
  );
}
