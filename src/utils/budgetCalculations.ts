
import { Budget } from '@/types/budget';

export const calculateTotalExpenses = (budget: Budget) => {
  return budget.fixedCosts.reduce((total, cost) => {
    return total + (cost.amount * (30 / cost.period));
  }, 0);
};

export const calculateTotalSales = (budget: Budget) => {
  return budget.products.reduce((total, product) => {
    const revenue = product.pricePerUnit * product.unitsSold * (30 / product.period);
    const costs = product.costPerUnit * product.unitsSold * (30 / product.period);
    return total + (revenue - costs);
  }, 0);
};

export const calculateTotalProfit = (budget: Budget) => {
  const totalExpenses = calculateTotalExpenses(budget);
  const totalIncome = calculateTotalSales(budget);
  return totalIncome - totalExpenses;
};
