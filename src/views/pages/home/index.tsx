'use client';

import { Box, Input, Typography } from '@mui/material';
import { weatherAPI } from 'config/api';
import { KeyboardEvent, useState } from 'react';
import { WeatherAPIResponse } from 'views/types';

export default function HomeContainer() {
  const [result, setResult] = useState<WeatherAPIResponse>();

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      weatherAPI.getRealtimeWeather(e.currentTarget.value).then((res: any) => {
        if (!res) return;

        setResult(res);
      });
    }
  };

  return (
    <Box sx={{ background: '#fff' }}>
      <Box>
        <Input placeholder='Input your Country' onKeyDown={handleEnter} />
        <Typography>Note: Enter to Submit</Typography>
      </Box>
      <Box>
        Result:
        <Typography>{JSON.stringify(result)}</Typography>
      </Box>
    </Box>
  );
}
