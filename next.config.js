/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    domains: ['18.221.134.53'],
  },
  nextConfig,
  env: {
    INFURA_ID: 'a5b51678f5c248c5af6c10dc7c5501ea',
    BACKEND_URL: 'https://18.221.134.53/api',
    BACKEND_ASSETS_URL: 'https://18.221.134.53/assets',
    PINATA_API_KEY: '1f8e37ec423bce5ed562',
    PINATA_SECRET_API_KEY: '12bc6c92c377a63574ac6307bff4213da8adf58b604148fb3313018948f1b864',
    TOKEN_URL: '0x194194b1D78172446047e327476B811f5D365c21',
    ETHER_CHAIN: 4, //rinkeby test network, we can chain it to mainnet later
    POLYGON_CHAIN: 80001, //mumbai test network, we can chain it to mainnet later
    ETH_TOKEN: "0x889E39c7d55562f9acD4Bf21eE3F257B545F2A30",
    ETH_MARKET: "0x23a7af956ea04169A83046182F7A118Ab810f110",
    ETH_NFT: "0x37A70817106e3BCD7b14Cb5a53f232C79F076CAE",
    POL_TOKEN: "0x52664951a6f71e03831F0c8557Bd2e102eBed844",
    POL_MARKET: "0x4054e158C0D7B11c79176535F2Be96e9255c73C0",
    POL_NFT: "0xa59E67c493bcCA3eFdeF46436b2FCCA1DF49754F",
    TEST_PRIVATE_KEY: '95cd7ac56a15b471c1d479b6f109881606affab88d03c95cbc44076c7018f88a',
    PRIVATE_KEY: '95cd7ac56a15b471c1d479b6f109881606affab88d03c95cbc44076c7018f88a',
  },
}
