export interface BaseProps {
    title: string;
    subheader?: string;
}

export interface ChartProps {
    colors?: string[];
    series: any[];
    options?: object;
    categories?: string[];
    labels?: string[];
}

export interface ListProps<T> {
    list: T[];
}

export interface AppConversionRatesProps extends BaseProps {
    chart: {
        colors?: string[];
        series: { value: number; label: string }[];
        options?: object;
    };
}

export interface AppCurrentSubjectProps extends BaseProps {
    chart: {
        series: any;
        colors?: string[];
        categories?: string[];
        options?: object;
    };
}

export interface AppCurrentVisitsProps extends BaseProps {
    chart: {
        colors?: string[];
        series: { value: number; label: string }[];
        options?: object;
    };
}

export interface AppNewsUpdateProps extends BaseProps, ListProps<{
    id: string;
    image: string;
    title: string;
    description: string;
    postedAt: Date;
}> { }

export interface AnalyticsOrderTimelineProps extends BaseProps, ListProps<{
    id: string;
    type: string;
    title: string;
    time: string;
}> { }

export interface AnalyticsTasksProps extends BaseProps, ListProps<{
    id: string;
    name: string;
}> { }

export interface AppTrafficBySiteProps extends BaseProps, ListProps<{
    name: string;
    value: number;
    icon: React.ReactNode;
}> { }

export interface AppWebsiteVisitsProps extends BaseProps {
    chart: {
        labels?: string[];
        colors?: string[];
        series: {
            name: string;
            data: number[];
            fill: string;
            type?: string;
        }[];
        options?: object;
    };
}

export interface AppWidgetSummaryProps {
    title: string;
    total: string | number;
    icon: React.ReactNode;
    color?: string;
    sx?: object;
}

export type AppProps =
    | { type: "conversionRates"; data: AppConversionRatesProps }
    | { type: "currentSubject"; data: AppCurrentSubjectProps }
    | { type: "currentVisits"; data: AppCurrentVisitsProps }
    | { type: "newsUpdate"; data: AppNewsUpdateProps }
    | { type: "orderTimeline"; data: AnalyticsOrderTimelineProps }
    | { type: "tasks"; data: AnalyticsTasksProps }
    | { type: "trafficBySite"; data: AppTrafficBySiteProps }
    | { type: "websiteVisits"; data: AppWebsiteVisitsProps }
    | { type: "widgetSummary"; data: AppWidgetSummaryProps };

