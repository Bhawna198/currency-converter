import React, { useState, useEffect } from 'react';

const Converter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY'];

  // Update exchange rate when currencies change
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await response.json();
        if (data.result === 'success') {
          setExchangeRate(data.rates[toCurrency]);
          setConvertedAmount((amount * data.rates[toCurrency]).toFixed(2));
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency, amount]);

  // Handle amount input change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (exchangeRate) {
      setConvertedAmount((value * exchangeRate).toFixed(2));
    }
  };

  return (
    <div className="wrapper">
      <style>
        {`
          .wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f0f2f5;
          }
          .converter-container {
            max-width: 400px;
            width: 100%;
            padding: 30px;
            background: linear-gradient(135deg, #e6f0ff, #d6e4ff);
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease;
          }
          .converter-container h2 {
            font-size: 28px;
            font-weight: 700;
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
          }
          .input-group {
            margin-bottom: 20px;
          }
          .input-group label {
            display: block;
            color: #34495e;
            font-weight: 500;
            margin-bottom: 8px;
          }
          .input-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #bdc3c7;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .input-group input:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
          }
          .currency-group {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 20px;
          }
          .currency-group div {
            flex: 1;
          }
          .currency-group select {
            width: 100%;
            padding: 12px;
            border: 1px solid #bdc3c7;
            border-radius: 8px;
            font-size: 16px;
            background: #fff;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
            appearance: none;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='6'><path fill='%2334495e' d='M0 0h12L6 6z'/></svg>");
            background-repeat: no-repeat;
            background-position: right 12px center;
          }
          .currency-group select:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
          }
          .result {
            text-align: center;
          }
          .result p {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
            background: #f5f8ff;
            padding: 12px 16px;
            border-radius: 8px;
            margin: 0;
          }
          .result .rate {
            font-size: 14px;
            color: #7f8c8d;
            font-style: italic;
            margin-top: 12px;
          }
          .converter-container:hover {
            transform: translateY(-4px);
          }
        `}
      </style>
      <div className="converter-container">
        <h2>Currency Converter</h2>
        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min="0"
          />
        </div>
        <div className="currency-group">
          <div>
            <label>From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="result">
          {convertedAmount && exchangeRate && (
            <p>
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </p>
          )}
          {exchangeRate && (
            <p className="rate">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Converter;