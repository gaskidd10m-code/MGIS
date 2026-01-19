import React from 'react';
import { Helmet } from 'react-helmet-async';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Helmet>
                <title>Privacy Policy - Gossip Gazette</title>
                <meta name="description" content="Privacy Policy for Gossip Gazette" />
                <link rel="canonical" href="https://gossipgazette.online/privacy-policy" />
            </Helmet>

            <h1 className="text-3xl font-bold mb-6">Privacy Policy for Gossip Gazette</h1>
            <p className="mb-4">At Gossip Gazette, accessible from https://gossipgazette.online, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Gossip Gazette and how we use it.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Log Files</h2>
            <p className="mb-4">Gossip Gazette follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Cookies and Web Beacons</h2>
            <p className="mb-4">Like any other website, Gossip Gazette uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Google DoubleClick DART Cookie</h2>
            <p className="mb-4">Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-500 hover:underline">https://policies.google.com/technologies/ads</a></p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Our Advertising Partners</h2>
            <p className="mb-4">Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Google: <a href="https://policies.google.com/technologies/ads" className="text-blue-500 hover:underline">https://policies.google.com/technologies/ads</a></li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Consent</h2>
            <p className="mb-4">By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
        </div>
    );
};
