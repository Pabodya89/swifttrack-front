/**
 * @typedef {Object} Package
 * @property {string} id
 * @property {string} trackingNumber
 * @property {string} clientName
 * @property {string} recipientName
 * @property {string} recipientAddress
 * @property {number} weight
 * @property {'Received'|'Processing'|'Ready for Dispatch'|'In Transit'|'Delivered'} status
 * @property {{ zone: string, shelf: string, position: string }} location
 * @property {'Low'|'Medium'|'High'} priority
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Driver
 * @property {string} id
 * @property {string} name
 * @property {string} licenseNumber
 * @property {string} phoneNumber
 * @property {string} vehicleType
 * @property {'Available'|'Busy'|'On Break'} status
 * @property {string} [currentLocation]
 * @property {number} deliveriesCompleted
 * @property {number} rating
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {Package[]} packages
 * @property {Driver} driver
 * @property {'Processing'|'Ready for Dispatch'|'In Transit'|'Completed'} status
 * @property {Date} createdAt
 * @property {Date} estimatedDelivery
 */

export const Package = {};
export const Driver = {};
export const Order = {};
