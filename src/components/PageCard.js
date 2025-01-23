import React from "react";

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Chip,
} from "@mui/material";

const PageCard = (props) => {
  const { titleColor = '#000', headerBGColor = 'window', actions, title, children } = props;

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
      }}
    >
      <Box p={2} display="flex" alignItems="center" bgcolor={headerBGColor ?? 'window'}>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            color: { titleColor }
          }}
        >
          {title}
        </Typography>
        {actions && (<Box sx={{ ml: "auto", display: 'flex', gap: 1 }}> {actions.map((action, index) => (<Box key={index}> {action} </Box>))} </Box>)}
      </Box>
      <Divider sx={{ bgcolor: 'black', height: 1 }} />
      <CardContent sx={{ padding: 2 }}>{children}</CardContent>
    </Card>
  );
};

export default PageCard;
