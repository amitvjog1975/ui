import Grid from '@mui/material/Grid2';
import BaseCard from '../BaseCard';
import { Typography } from '@mui/material';
import { Fragment } from 'react';

const EODShopSnapShots = (props) => {
    const _netReadingData = props.machineNetReadingData;
    const _saleWinData = props.saleWinData;
    const _salesAmount = props.salesAmount;
    const _winAmount = props.winAmount;
    
    return (
        <Fragment>
            <Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
                <Grid size={{ md: 4, lg: 4, sm: 6, xs: 12 }}>
                    <BaseCard title="Machine Reading Data" headerBGColor='#f5f5f5'>
                        <>
                            <Typography sx={{ fontSize: '12px' }}>In Reading: {_netReadingData?.netInReading}</Typography>
                            <Typography sx={{ fontSize: '12px' }}>Out Reading: {_netReadingData?.netOutReading}</Typography>
                        </>
                    </BaseCard>
                </Grid>
                <Grid size={{ md: 4, lg: 4, sm: 6, xs: 12 }}>
                    <BaseCard title="Checker Sale Win Data" headerBGColor='#f5f5f5'>
                        <Typography sx={{ fontSize: '12px' }}>Checker Sales: {_saleWinData?.checkerSales}</Typography>
                        <Typography sx={{ fontSize: '12px' }}>Checker Win: {_saleWinData?.checkerWin}</Typography>
                    </BaseCard>
                </Grid>
                <Grid size={{ md: 4, lg: 4, sm: 6, xs: 12 }}>
                    <BaseCard title="Shop Sale Win Data" headerBGColor='#f5f5f5'>
                        <Typography sx={{ fontSize: '12px' }}>Shop Sales: {_salesAmount?.value}</Typography>
                        <Typography sx={{ fontSize: '12px' }}>Shop Win: {_winAmount?.value}</Typography>
                    </BaseCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default EODShopSnapShots;