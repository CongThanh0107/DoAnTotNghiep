import {EventInput} from '@fullcalendar/common';

// ----------------------------------------------------------------------

export type ICalendarViewValue = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type ICalendarEvent = {
    title: string;
    description: string;
    textColor: string;
    allDay: boolean;
    start: Date | string | null;
    end: Date | string | null;
};

export type IDateData = {
    id: string;
    date: Date;
    start_time: Date | string | null;
    end_time: Date | string | null;
    type: string;
}

export type IDateState = {
    isLoading: boolean;
    error: Error | string | null;
    dates: IDateData[];
    date: IDateData | null;
    openModal: boolean;
    selectedDateId: string | null;
    selectedRange: {
        start: Date;
        end: Date;
    } | null;
}

export type IShiftData = {
    id: string;
    name: string;
    startTime: Date | string | null;
    endTime: Date | string | null;
    number_of_employees: number;
}
export type IScheduleData = {
    id: string;
    employee_id: string;
    employee_name: string;
    department_id: string;
    start_time: string;
    end_time: string;
    text_color: string;
    created_at: Date | string | null;
    updated_at: Date | string | null;
    deleted_at: Date | string | null;
}

export type ICreateDateData = {
    date: Date;
    start_time: Date | string | null;
    end_time: Date | string | null;
    type: string;
}

export type ICalendarState = {
    isLoading: boolean;
    error: Error | string | null;
    events: EventInput[];
    schedules: IScheduleData[];
    schedule: IScheduleData | null;
    selectedScheduleId: string | null;
    openModal: boolean;
    selectedEventId: string | null;
    selectedRange: {
        start: Date;
        end: Date;
    } | null;
};


