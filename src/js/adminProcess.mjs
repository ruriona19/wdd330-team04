import { getOrders } from "./externalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

const token = getLocalStorage("so_token");

export async function displayOrders(parentSelector){
    
    let orders = await getOrders(token);
    
    orders.forEach(order => {
        
        const orderDate = new Date(order.orderDate).toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
          });;
        const orderHtml = `
        <tr>
            <td class="t-date">${orderDate}</td>
            <td class="t-id">${order.id}</td>
            <td class="t-names">${order.lname}, ${order.fname}</td>
            <td class="t-address">${order.street}, ${order.city}, ${order.state}</td>
            <td class="t-items">${order.items.length}</td>
        </tr>
        `
        parentSelector.insertAdjacentHTML("afterbegin", orderHtml);
    });
}