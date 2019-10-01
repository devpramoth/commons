//
// commons-server connection
//
export const serviceUri =
    process.env.REACT_APP_SERVICE_URI || 'http://localhost:4000'

//
// OCEAN REMOTE CONNECTIONS
//
export const nodeUri =
    process.env.REACT_APP_NODE_URI || 'https://pacific.oceanprotocol.com'
export const aquariusUri =
    process.env.REACT_APP_AQUARIUS_URI ||
    'https://aquarius.commons.oceanprotocol.com'
export const brizoUri =
    process.env.REACT_APP_BRIZO_URI || 'https://brizo.commons.oceanprotocol.com'
export const brizoAddress =
    process.env.REACT_APP_BRIZO_ADDRESS ||
    '0x008c25ed3594e094db4592f4115d5fa74c4f41ea'
export const secretStoreUri =
    process.env.REACT_APP_SECRET_STORE_URI ||
    'https://secret-store.oceanprotocol.com'
export const faucetUri =
    process.env.REACT_APP_FAUCET_URI || 'https://faucet.oceanprotocol.com'

//
// APP CONFIG
//
export const verbose = true
export const analyticsId = 'UA-60614729-11'
export const allowPricing = true
