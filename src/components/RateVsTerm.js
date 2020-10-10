import React, { useEffect, useState, useCallback } from "react";
import PMT from "../maths/pmt";

const row = (
  term,
  rates,
  presentValue,
  weeklyOutgoing,
  weeklyMaintenance,
  weeklyIncome
) => (
  <tr key={term}>
    <th scope="row">{term} Years</th>
    {rates.map((rate) => {
      const amountPerMonth = PMT(rate / 100, term * 12, presentValue);
      const amountPerWeek = (amountPerMonth * 12) / 52;
      const displayAmount = Math.round(amountPerWeek);

      const leftOverMoney =
        weeklyIncome - (weeklyOutgoing + amountPerWeek + weeklyMaintenance);

      return (
        <td key={rate}>
          Base:&nbsp;${displayAmount} <br />
          Utilities:&nbsp;${weeklyOutgoing} <br />
          Maintenance:&nbsp;${weeklyMaintenance} <br />
          Income:&nbsp;${weeklyIncome} <br />
          <strong>Leftover:&nbsp;${Math.round(leftOverMoney)}</strong>
        </td>
      );
    })}
  </tr>
);

export default () => {
  const rates = [1.5, 2, 2.5, 3, 3.5, 4, 5, 8, 10];
  const terms = [15, 20, 25, 30];

  const [housePrice, setHousePrice] = useState(800_000);
  const [deposit, setDeposit] = useState(160_000);
  const [internetPrice, setInternetPrice] = useState(80);
  const [powerPrice, setPowerPrice] = useState(150);
  const [foodPrice, setFoodPrice] = useState(120);
  const [fortnightlyIncome, setFortnightlyIncome] = useState(4500);
  const [weeklyTransportCost, setWeeklyTransportCost] = useState(100);
  const [councilRates, setCouncilRates] = useState(2100);
  const [monthlyWaterBill, setMonthlyWaterBill] = useState(70);
  const [yearlyInsurance, setYearlyInsurance] = useState(2000);

  const weeklyMaintenance = Math.round((0.01 * housePrice) / 52);

  const weeklyIncome = Math.round(fortnightlyIncome / 2);

  const getWeeklyCost = useCallback(() => {
    const monthlyItems = internetPrice + powerPrice + monthlyWaterBill;
    const weeklyItems = foodPrice + weeklyTransportCost;
    const yearlyItems = councilRates + yearlyInsurance;

    const monthlyCostAsWeekly = (monthlyItems * 12) / 52;
    const weeklyCostAsWeekly = weeklyItems;
    const yearlyCostAsWeekly = yearlyItems / 52;

    return monthlyCostAsWeekly + weeklyCostAsWeekly + yearlyCostAsWeekly;
  }, [
    internetPrice,
    powerPrice,
    foodPrice,
    weeklyTransportCost,
    councilRates,
    monthlyWaterBill,
    yearlyInsurance,
  ]);

  const [weeklyOutgoing, setWeeklyOutgoing] = useState(
    Math.round(getWeeklyCost())
  );

  useEffect(() => setWeeklyOutgoing(Math.round(getWeeklyCost())), [
    getWeeklyCost,
  ]);

  const presentValue = housePrice - deposit;

  return (
    <div className="m-5">
      <form>
        <div className="row justify-content-center">
          <div className="mb-3 col-6">
            <label htmlFor="housePrice" className="form-label">
              House Price
            </label>
            <input
              type="number"
              className="form-control"
              id="housePrice"
              value={housePrice}
              onChange={(evt) => setHousePrice(parseFloat(evt.target.value))}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="deposit" className="form-label">
              Amount for Deposit
            </label>
            <input
              type="number"
              className="form-control"
              id="deposit"
              value={deposit}
              onChange={(evt) => setDeposit(parseFloat(evt.target.value))}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="fortnightlyIncome" className="form-label">
              Fortnightly Income
            </label>
            <input
              type="number"
              className="form-control"
              id="fortnightlyIncome"
              value={fortnightlyIncome}
              onChange={(evt) =>
                setFortnightlyIncome(parseFloat(evt.target.value))
              }
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="internet" className="form-label">
              Monthly Internet Bill
            </label>
            <input
              type="number"
              className="form-control"
              id="internet"
              value={internetPrice}
              onChange={(evt) => setInternetPrice(parseFloat(evt.target.value))}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="power" className="form-label">
              Monthly Power Bill
            </label>
            <input
              type="number"
              className="form-control"
              id="power"
              value={powerPrice}
              onChange={(evt) => setPowerPrice(parseFloat(evt.target.value))}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="food" className="form-label">
              Weekly Food Bill
            </label>
            <input
              type="number"
              className="form-control"
              id="food"
              value={foodPrice}
              onChange={(evt) => setFoodPrice(parseFloat(evt.target.value))}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="weeklyTransportCost" className="form-label">
              Weekly transport cost
            </label>
            <input
              type="number"
              className="form-control"
              id="weeklyTransportCost"
              value={weeklyTransportCost}
              onChange={(evt) =>
                setWeeklyTransportCost(parseFloat(evt.target.value))
              }
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="councilRates" className="form-label">
              Yearly council rates
            </label>
            <input
              type="number"
              className="form-control"
              id="councilRates"
              value={councilRates}
              onChange={(evt) => setCouncilRates(parseFloat(evt.target.value))}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="monthlyWaterBill" className="form-label">
              Monthly water bill
            </label>
            <input
              type="number"
              className="form-control"
              id="monthlyWaterBill"
              value={monthlyWaterBill}
              onChange={(evt) =>
                setMonthlyWaterBill(parseFloat(evt.target.value))
              }
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="yearlyInsurance" className="form-label">
              Yearly insurance bill
            </label>
            <input
              type="number"
              className="form-control"
              id="yearlyInsurance"
              value={yearlyInsurance}
              onChange={(evt) =>
                setYearlyInsurance(parseFloat(evt.target.value))
              }
            />
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Terms/Interest rate</th>
              {rates.map((rate) => (
                <th scope="col" key={rate}>
                  {rate}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {terms.map((term) =>
              row(
                term,
                rates,
                presentValue,
                weeklyOutgoing,
                weeklyMaintenance,
                weeklyIncome
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
