// Utility functions for dashboard calculations

export const calculateKPIs = (salesData) => {
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  return {
    totalRevenue,
    totalOrders,
    totalCustomers,
    avgOrderValue
  };
};

export const calculateGrowthRate = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous * 100).toFixed(1);
};

export const calculateTrend = (data, key) => {
  if (data.length < 2) return 0;
  
  const current = data[data.length - 1][key];
  const previous = data[data.length - 2][key];
  
  return calculateGrowthRate(current, previous);
};

export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (number, locale = 'en-US') => {
  return new Intl.NumberFormat(locale).format(number);
};

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const getPerformanceColor = (value, threshold = { good: 10, bad: -5 }) => {
  if (value >= threshold.good) return 'text-green-600';
  if (value <= threshold.bad) return 'text-red-600';
  return 'text-yellow-600';
};

export const calculateMovingAverage = (data, key, window = 3) => {
  return data.map((item, index) => {
    if (index < window - 1) return { ...item, [key + '_ma']: null };
    
    const sum = data
      .slice(index - window + 1, index + 1)
      .reduce((acc, curr) => acc + curr[key], 0);
    
    return { ...item, [key + '_ma']: sum / window };
  });
};

export const filterDataByDateRange = (data, startDate, endDate, dateKey = 'date') => {
  return data.filter(item => {
    const itemDate = new Date(item[dateKey]);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

export const aggregateDataByPeriod = (data, period = 'month', valueKey = 'value') => {
  const grouped = data.reduce((acc, item) => {
    const date = new Date(item.date);
    let key;
    
    switch (period) {
      case 'week':
        key = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
        break;
      case 'month':
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        break;
      case 'quarter':
        key = `${date.getFullYear()}-Q${Math.ceil((date.getMonth() + 1) / 3)}`;
        break;
      case 'year':
        key = date.getFullYear().toString();
        break;
      default:
        key = item.date;
    }
    
    if (!acc[key]) {
      acc[key] = { period: key, total: 0, count: 0 };
    }
    
    acc[key].total += item[valueKey];
    acc[key].count += 1;
    
    return acc;
  }, {});
  
  return Object.values(grouped).map(item => ({
    ...item,
    average: item.total / item.count
  }));
};

export const calculateVariance = (data, key) => {
  const values = data.map(item => item[key]);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  
  return {
    mean,
    variance,
    standardDeviation: Math.sqrt(variance)
  };
};

export const findOutliers = (data, key, threshold = 2) => {
  const stats = calculateVariance(data, key);
  
  return data.filter(item => {
    const zScore = Math.abs(item[key] - stats.mean) / stats.standardDeviation;
    return zScore > threshold;
  });
};

export const calculatePearsonCorrelation = (data, keyX, keyY) => {
  const n = data.length;
  const sumX = data.reduce((sum, item) => sum + item[keyX], 0);
  const sumY = data.reduce((sum, item) => sum + item[keyY], 0);
  const sumXY = data.reduce((sum, item) => sum + item[keyX] * item[keyY], 0);
  const sumX2 = data.reduce((sum, item) => sum + item[keyX] * item[keyX], 0);
  const sumY2 = data.reduce((sum, item) => sum + item[keyY] * item[keyY], 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;
};