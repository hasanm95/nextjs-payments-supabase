// next.config.mjs

import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig = {
  images: {
    remotePatterns: [
          {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},],
  },
};

export default withAutoCert(nextConfig);