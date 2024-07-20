import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import config from '../../../config/config';

const SubscriptionPlan = () => {
    const {currentUser} =  useSelector((state)=> state.user)
    const [allSubcribedPlans, setAllSubscribedPlans] = useState([]);

    useEffect(() => {
      const getAllPlans = async () => {
        try {
          const response = await axios.get(
            `${config.apiUrl}/subscription/${currentUser?.companyId}`
          );
  
          const { plans } = response.data;
          setAllSubscribedPlans(plans);
        } catch (error) {
          console.log(error);
        }
      };
      getAllPlans();
    }, [currentUser?.companyId]);
  
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="border text-black">
                <tr>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Name
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Purchase Date
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Amount
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {allSubcribedPlans.map((plan) => (
                  <tr
                    key={plan._id}
                    className="hover:bg-gray-100 text-center capitalize"
                  >
                    <td className="py-3 px-4 border-gray-200">
                      {plan.softwareName}
                    </td>
                    <td className="py-3 px-4 border-gray-200">{plan.startDate}</td>
                    <td className="py-3 px-4 border-gray-200">5000</td>
                    <td className="py-3 px-4  border-gray-200">{plan.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

export default SubscriptionPlan