import {
  CandlestickStyleOptions,
  ChartOptions,
  createChart,
  CrosshairMode,
  DeepPartial,
  SeriesOptionsCommon,
} from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import testData from './sample-data';

const getChartOptions = (
  width: number,
  height: number,
): DeepPartial<ChartOptions> => ({
  width,
  height,
  layout: {
    backgroundColor: '#000000',
    textColor: 'rgba(255, 255, 255, 0.9)',
  },
  grid: {
    vertLines: {
      color: 'rgba(197, 203, 206, 0.5)',
    },
    horzLines: {
      color: 'rgba(197, 203, 206, 0.5)',
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },
  rightPriceScale: {
    borderColor: 'rgba(197, 203, 206, 0.8)',
  },
  timeScale: {
    borderColor: 'rgba(197, 203, 206, 0.8)',
  },
});

const candlestickOptions: DeepPartial<
  CandlestickStyleOptions & SeriesOptionsCommon
> = {
  upColor: 'rgba(255, 144, 0, 1)',
  downColor: '#000',
  borderDownColor: 'rgba(255, 144, 0, 1)',
  borderUpColor: 'rgba(255, 144, 0, 1)',
  wickDownColor: 'rgba(255, 144, 0, 1)',
};

const KChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current === null) {
      return;
    }

    const chart = createChart(chartRef.current, getChartOptions(600, 400));

    const candleSeries = chart.addCandlestickSeries(candlestickOptions);

    candleSeries.setData(testData);

    return () => {
      chart.remove();
    };
  }, [chartRef]);

  return <div ref={chartRef} />;
};

export default KChart;
