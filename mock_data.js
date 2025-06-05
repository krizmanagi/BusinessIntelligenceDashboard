// Mock data for the dashboard
// In a real application, this would be replaced with API calls

export const salesData = [
  { month: 'Jan', revenue: 45000, orders: 120, customers: 85, growth: 8.2 },
  { month: 'Feb', revenue: 52000, orders: 145, customers: 98, growth: 15.6 },
  { month: 'Mar', revenue: 48000, orders: 132, customers: 91, growth: 6.7 },
  { month: 'Apr', revenue: 61000, orders: 168, customers: 112, growth: 27.1 },
  { month: 'May', revenue: 55000, orders: 151, customers: 105, growth: 22.2 },
  { month: 'Jun', revenue: 67000, orders: 184, customers: 127, growth: 48.9 }
];

export const regionData = [
  { 
    name: 'North America', 
    value: 35, 
    sales: 180000, 
    growth: 12.5,
    customers: 1250,
    color: '#0066CC'
  },
  { 
    name: 'Europe', 
    value: 28, 
    sales: 145000, 
    growth: 8.3,
    customers: 980,
    color: '#FF6B35'
  },
  { 
    name: 'Asia Pacific', 
    value: 22, 
    sales: 115000, 
    growth: 22.1,
    customers: 750,
    color: '#2ECC71'
  },
  { 
    name: 'Latin America', 
    value: 15, 
    sales: 78000, 
    growth: 5.7,
    customers: 420,
    color: '#E74C3C'
  }
];

export const productData = [
  { 
    category: 'Electronics', 
    q1: 125000, 
    q2: 135000, 
    q3: 142000, 
    q4: 158000,
    growth: 26.4,
    margin: 23.5
  },
  { 
    category: 'Clothing', 
    q1: 89000, 
    q2: 95000, 
    q3: 105000, 
    q4: 112000,
    growth: 25.8,
    margin: 45.2
  },
  { 
    category: 'Home & Garden', 
    q1: 67000, 
    q2: 72000, 
    q3: 78000, 
    q4: 85000,
    growth: 26.9,
    margin: 32.1
  },
  { 
    category: 'Sports', 
    q1: 45000, 
    q2: 52000, 
    q3: 58000, 
    q4: 63000,
    growth: 40.0,
    margin: 28.7
  },
  { 
    category: 'Books', 
    q1: 32000, 
    q2: 35000, 
    q3: 38000, 
    q4: 41000,
    growth: 28.1,
    margin: 18.9
  }
];

export const customerData = [
  { month: 'Jan', new: 25, returning: 60, churned: 8 },
  { month: 'Feb', new: 32, returning: 66, churned: 12 },
  { month: 'Mar', new: 28, returning: 63, churned: 9 },
  { month: 'Apr', new: 41, returning: 71, churned: 15 },
  { month: 'May', new: 35, returning: 70, churned: 11 },
  { month: 'Jun', new: 48, returning: 79, churned: 13 }
];

export const topProducts = [
  { name: 'Wireless Headphones', sales: 15420, revenue: 231300 },
  { name: 'Smart Watch', sales: 12340, revenue: 370200 },
  { name: 'Laptop Stand', sales: 9870, revenue: 98700 },
  { name: 'USB-C Hub', sales: 8950, revenue: 134250 },
  { name: 'Bluetooth Speaker', sales: 7830, revenue: 156600 }
];

// Utility function to generate random data (for demo purposes)
export const generateRandomData = (baseData, variance = 0.1) => {
  return baseData.map(item => ({
    ...item,
    revenue: Math.floor(item.revenue * (1 + (Math.random() - 0.5) * variance)),
    orders: Math.floor(item.orders * (1 + (Math.random() - 0.5) * variance)),
    customers: Math.floor(item.customers * (1 + (Math.random() - 0.5) * variance))
  }));
};

// API simulation functions
export const fetchSalesData = async () => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return generateRandomData(salesData);
};

export const fetchRegionData = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return regionData;
};

export const fetchProductData = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return productData;
};