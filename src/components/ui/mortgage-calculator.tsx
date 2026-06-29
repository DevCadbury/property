"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface MortgageCalculatorProps {
  price: number;
  className?: string;
}

export function MortgageCalculator({ price, className }: MortgageCalculatorProps) {
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(5.25);
  const [amortization, setAmortization] = useState(25);
  const [propertyTax, setPropertyTax] = useState(true);

  const { monthlyPayment, principalInterest, taxes } = useMemo(() => {
    const principal = price * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = amortization * 12;
    const mortgagePayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    const monthlyTax = propertyTax ? (price * 0.0035) / 12 : 0;
    return {
      monthlyPayment: mortgagePayment + monthlyTax,
      principalInterest: mortgagePayment,
      taxes: monthlyTax,
    };
  }, [price, downPayment, interestRate, amortization, propertyTax]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className={cn("rounded-lg border border-border bg-card p-6", className)}>
      <h3 className="font-display text-xl font-semibold text-foreground mb-6">
        Mortgage Calculator
      </h3>

      <div className="space-y-5">
        {/* Down Payment */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-muted-foreground">Down Payment</label>
            <span className="font-medium text-foreground">{downPayment}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#AC7E71]"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5%</span>
            <span>{formatCurrency(price * (downPayment / 100))}</span>
            <span>50%</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-muted-foreground">Interest Rate</label>
            <span className="font-medium text-foreground">{interestRate}%</span>
          </div>
          <input
            type="range"
            min="3"
            max="8"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#AC7E71]"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>3%</span>
            <span>8%</span>
          </div>
        </div>

        {/* Amortization */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-muted-foreground">Amortization</label>
            <span className="font-medium text-foreground">{amortization} years</span>
          </div>
          <input
            type="range"
            min="10"
            max="30"
            step="5"
            value={amortization}
            onChange={(e) => setAmortization(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#AC7E71]"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>10 yrs</span>
            <span>30 yrs</span>
          </div>
        </div>

        {/* Property Tax Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground">Include Property Tax</label>
          <button
            onClick={() => setPropertyTax(!propertyTax)}
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative",
              propertyTax ? "bg-[#AC7E71]" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                propertyTax ? "left-7" : "left-1"
              )}
            />
          </button>
        </div>
      </div>

      {/* Monthly Payment Display */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Payment</p>
          <p className="text-3xl font-bold text-foreground font-display">
            {formatCurrency(monthlyPayment)}
          </p>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-muted/50 rounded p-3 text-center">
            <p className="text-muted-foreground text-xs mb-1">Principal & Interest</p>
            <p className="font-semibold text-foreground">
              {formatCurrency(principalInterest)}
            </p>
          </div>
          <div className="bg-muted/50 rounded p-3 text-center">
            <p className="text-muted-foreground text-xs mb-1">Property Tax</p>
            <p className="font-semibold text-foreground">{formatCurrency(taxes)}</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        This is an estimate only. Contact a mortgage professional for accurate rates.
      </p>
    </div>
  );
}