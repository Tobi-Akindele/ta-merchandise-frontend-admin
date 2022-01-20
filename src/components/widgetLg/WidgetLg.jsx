import { useState, useEffect } from 'react';
import './widgetLg.css';
import { userRequest } from '../../requestMethods';
import { format } from 'timeago.js';

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>;
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get('/orders');
        setOrders(res.data);
      } catch (error) {}
    };
    getOrders();
  }, []);

  return (
    <div className='widgetLg'>
      <h3 className='widgetLgTitle'>Latest transactions</h3>
      <table className='widgetLgTable'>
        <tr className='widgetLgTr'>
          <th className='widgetLgTh'>Customer</th>
          <th className='widgetLgTh'>Date</th>
          <th className='widgetLgTh'>Amount</th>
          <th className='widgetLgTh'>Status</th>
        </tr>
        {orders.map((order) => (
          <tr className='widgetLgTr' key={order.id}>
            <td className='widgetLgUser'>
              <img
                src={
                  order.user?.img ||
                  'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                }
                alt=''
                className='widgetLgImg'
              />
              <span className='widgetLgName'>
                {order.user?.firstName} {order.user?.lastName}
              </span>
            </td>
            <td className='widgetLgDate'>{format(order.createdAt)}</td>
            <td className='widgetLgAmount'>£{order.amount}</td>
            <td className='widgetLgStatus'>
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
