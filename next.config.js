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
    domains: ['dev.api.stokenft.com'],
  },
  nextConfig,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    INFURA_ID: 'a5b51678f5c248c5af6c10dc7c5501ea',
    BACKEND_URL: 'https://dev.api.stokenft.com/api',
    BACKEND_ASSETS_URL: 'https://dev.api.stokenft.com/assets',
    PINATA_API_KEY: '1f8e37ec423bce5ed562',
    PINATA_SECRET_API_KEY: '12bc6c92c377a63574ac6307bff4213da8adf58b604148fb3313018948f1b864',
    TOKEN_URL: '0x194194b1D78172446047e327476B811f5D365c21',
    ETHER_CHAIN: 4, //rinkeby test network, we can chain it to mainnet later
    POLYGON_CHAIN: 80001, //mumbai test network, we can chain it to mainnet later
    // ETH_TOKEN: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    ETH_TOKEN: "0x889E39c7d55562f9acD4Bf21eE3F257B545F2A30",
    ETH_MARKET: "0x95cb78E7C46028140529adEF17B859DA09F14250",
    ETH_NFT: "0x7ee28FF716b44Eb0496181B01f96800e632DD913",
    POL_TOKEN: "0x52664951a6f71e03831F0c8557Bd2e102eBed844",
    POL_MARKET: "0x4054e158C0D7B11c79176535F2Be96e9255c73C0",
    POL_NFT: "0xa59E67c493bcCA3eFdeF46436b2FCCA1DF49754F"
  },
  // [x]: ropsten
  // env: {
  //   INFURA_ID: 'a5b51678f5c248c5af6c10dc7c5501ea',
  //   BACKEND_URL: 'https://18.221.134.53/api',
  //   BACKEND_ASSETS_URL: 'https://18.221.134.53/assets',
  //   PINATA_API_KEY: '1f8e37ec423bce5ed562',
  //   PINATA_SECRET_API_KEY: '12bc6c92c377a63574ac6307bff4213da8adf58b604148fb3313018948f1b864',
  //   TOKEN_URL: '0x194194b1D78172446047e327476B811f5D365c21',
  //   ETHER_CHAIN: 3, //rinkeby test network, we can chain it to mainnet later
  //   POLYGON_CHAIN: 80001, //mumbai test network, we can chain it to mainnet later
  //   ETH_TOKEN: "0x8EeBe3332951397a403fF978Ea6A80f2BF8CD1a5",
  //   ETH_MARKET: "0x037d2FB9cFf586d7996d2e6663e92c8FE1aDE9Ae",
  //   ETH_NFT: "0x8EeBe3332951397a403fF978Ea6A80f2BF8CD1a5",
  //   POL_TOKEN: "0x52664951a6f71e03831F0c8557Bd2e102eBed844",
  //   POL_MARKET: "0x4054e158C0D7B11c79176535F2Be96e9255c73C0",
  //   POL_NFT: "0xa59E67c493bcCA3eFdeF46436b2FCCA1DF49754F"
  // },
}
