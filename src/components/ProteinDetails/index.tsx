import { useLocation, useParams } from "react-router-dom";
import "./index.css";
import { getProteinInfo } from "../../utils/search";
import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RootState } from "../../store/store";

const ProteinDetails = (): JSX.Element => {
  const proteinInfoData = useAppSelector((state: RootState) => {
    if (state.protein) {
      return state.protein;
    }
  });

  return (
    <Stack>
      <Typography fontWeight={600} fontSize={16} margin="24px 0 8px 0 ">
        Sequence
      </Typography>
      <table>
        <tbody>
          <tr>
            <td>
              <Stack>
                <Typography className="details__label">Length</Typography>
                <Typography className="details__data">
                  {proteinInfoData?.length}
                </Typography>
              </Stack>
            </td>
            <td>
              <Stack>
                <Typography className="details__label">Last updated</Typography>
                <Typography className="details__data">
                  {proteinInfoData?.lastUpdated}
                </Typography>
              </Stack>
            </td>
          </tr>
          <tr>
            <td>
              <Stack>
                <Typography className="details__label">Mass (Da)</Typography>
                <Typography className="details__data">
                  {proteinInfoData?.mass}
                </Typography>
              </Stack>
            </td>
            <td>
              <Stack>
                <Typography className="details__label">Checksum</Typography>
                <Typography className="details__data">
                  {proteinInfoData?.checksum}
                </Typography>
              </Stack>
            </td>
          </tr>
        </tbody>
      </table>
      <Box
        sx={{
          overflowWrap: "break-word",
          background: "#F2F2F2",
          borderRadius: "8px",
        }}
        marginTop={3}
        padding={1.5}
      >
        <Typography fontWeight={400} fontSize={12}>
          {proteinInfoData.sequence}
        </Typography>
      </Box>
    </Stack>
  );
};

export default ProteinDetails;
