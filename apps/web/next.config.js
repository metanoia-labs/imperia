//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    async redirects() {
        return [
            {
                source: "/invite",
                destination:
                    "https://discord.com/api/oauth2/authorize?client_id=911590809873301514&permissions=0&scope=applications.commands%20bot",
                permanent: true,
            },
            {
                source: "/support-server",
                destination: "https://discord.gg/KfhgHw7pvn",
                permanent: true,
            },
            {
                source: "/github",
                destination: "https://github.com/metanoia-labs/imperia",
                permanent: true,
            },
        ];
    },
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
