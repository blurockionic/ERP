import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import config from '../../../config/config';

const PaymentHistory = () => {

    const {currentUser} =  useSelector((state)=> state.user)

    const [allSubscribedPlans, setAllSubscribedPlans] = useState([]);

  useEffect(() => {
    const getAllPlans = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/subscription/${currentUser.companyId}`
        );

        const { plans } = response.data;
        const paidHistory = plans.map((item) => item.paymentHistory).flat();
        setAllSubscribedPlans(paidHistory);
      } catch (error) {
        console.log(error);
      }
    };

    getAllPlans();
  }, [currentUser.companyId]);

  const handleOnFormatDate = (dateString) => {
    const formattedDate = new Date(dateString).toLocaleString();
    return formattedDate;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="border text-black">
              <tr>
                <th className="w-1/2 sm:w-1/4 py-3 px-4 uppercase font-semibold text-sm">
                  Invoice Id
                </th>
                <th className="w-1/2 sm:w-1/4 py-3 px-4 uppercase font-semibold text-sm">
                  Date
                </th>
                <th className="w-1/2 sm:w-1/4 py-3 px-4 uppercase font-semibold text-sm">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {allSubscribedPlans.map((payment, index) => (
                <tr key={index} className="text-center">
                  <td className="w-1/2 sm:w-1/4 py-3 px-4">{payment.invoiceId}</td>
                  <td className="w-1/2 sm:w-1/4 py-3 px-4">
                    {handleOnFormatDate(payment.date)}
                  </td>
                  <td className="w-1/2 sm:w-1/4 py-3 px-4">{payment.amount / 100}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory