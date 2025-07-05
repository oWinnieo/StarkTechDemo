import * as React from 'react';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

type BasicDatePickerProps = {
  name: string;
  date: Dayjs | null;
  getDate: (arg: { date: Dayjs | null }) => void;
};

export const BasicDatePicker: React.FC<BasicDatePickerProps> = ({ name, date, getDate }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(date);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label={name}
          format="YYYY-MM-DD"
          value={selectedDate}
          onChange={(newValue) => {
            setSelectedDate(newValue);
            getDate({ date: newValue })
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}