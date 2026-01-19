import React from 'react';
import { Helmet } from 'react-helmet-async';

export const TermsOfService: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Helmet>
                <title>Terms of Service - Gossip Gazette</title>
                <meta name="description" content="Terms of Service for Gossip Gazette" />
                <link rel="canonical" href="https://gossipgazette.online/terms-of-service" />
            </Helmet>

            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">Welcome to Gossip Gazette!</p>
            <p className="mb-4">These terms and conditions outline the rules and regulations for the use of Gossip Gazette's Website, located at https://gossipgazette.online.</p>
            <p className="mb-4">By accessing this website we assume you accept these terms and conditions. Do not continue to use Gossip Gazette if you do not agree to take all of the terms and conditions stated on this page.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Cookies</h2>
            <p className="mb-4">We employ the use of cookies. By accessing Gossip Gazette, you agreed to use cookies in agreement with the Gossip Gazette's Privacy Policy.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">License</h2>
            <p className="mb-4">Unless otherwise stated, Gossip Gazette and/or its licensors own the intellectual property rights for all material on Gossip Gazette. All intellectual property rights are reserved. You may access this from Gossip Gazette for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <p className="mb-4">You must not:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Republish material from Gossip Gazette</li>
                <li>Sell, rent or sub-license material from Gossip Gazette</li>
                <li>Reproduce, duplicate or copy material from Gossip Gazette</li>
                <li>Redistribute content from Gossip Gazette</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Content Liability</h2>
            <p className="mb-4">We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Reservation of Rights</h2>
            <p className="mb-4">We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>
        </div>
    );
};
