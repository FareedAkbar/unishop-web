"use client";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Privacy Policy",
      content: [
        "This privacy policy sets out how this website (hereafter 'the Store') uses and protects any information that you give the Store while using this website.",
        "The Store is committed to ensuring that your privacy is protected. If we ask you to provide certain information that identifies you, you can be assured that it will only be used in accordance with this privacy statement.",
        "The Store may change this policy from time to time by updating this page. You should check this page periodically to ensure you are happy with any changes.",
      ],
    },
    {
      title: "What We Collect",
      content: [
        "We may collect the following information:",
        [
          "Name",
          "Contact information including email address",
          "Demographic information such as postcode, preferences, and interests",
          "Other information relevant to customer surveys and/or offers",
        ],
        "For the exhaustive list of cookies we collect, see the 'List of Cookies We Collect' section.",
      ],
    },
    {
      title: "What We Do With the Information We Gather",
      content: [
        "We require this information to understand your needs and provide you with better service, particularly for:",
        [
          "Internal record keeping.",
          "Improving our products and services.",
          "Sending promotional emails about new products, special offers, or other relevant information.",
          "Contacting you for market research purposes by email, phone, fax, or mail.",
          "Customizing the website according to your interests.",
        ],
      ],
    },
    {
      title: "Security",
      content: [
        "We are committed to ensuring that your information is secure. To prevent unauthorized access or disclosure, we have implemented physical, electronic, and managerial procedures to safeguard and secure the information collected online.",
      ],
    },
    {
      title: "How We Use Cookies",
      content: [
        "A cookie is a small file placed on your computer’s hard drive. Once you agree, the file helps analyze web traffic or notifies you of specific site visits.",
        [
          "Cookies allow web applications to respond to your preferences.",
          "We use traffic log cookies to identify which pages are visited, helping us improve our website.",
          "Cookies do not give us access to your computer or information other than what you share.",
          "You can accept or decline cookies. Modifying your browser settings may restrict website functionality.",
        ],
      ],
    },
    {
      title: "Links to Other Websites",
      content: [
        "Our website may contain links to other websites. Once you leave our site, we are not responsible for the protection and privacy of any information you provide on those sites. Always review the privacy policy of each website you visit.",
      ],
    },
    {
      title: "Controlling Your Personal Information",
      content: [
        "You can restrict the use of your personal information in these ways:",
        [
          "Look for opt-out checkboxes on forms to prevent direct marketing.",
          "If you previously agreed to direct marketing, you can change your preference by contacting us.",
        ],
        "We will not sell, distribute, or lease your personal information to third parties without permission unless required by law.",
        "You can request a copy of the personal information we hold about you under the Data Protection Act 1998. A small fee may apply.",
        "If any information we hold about you is incorrect, please contact us, and we will promptly correct it.",
      ],
    },
    // {
    //   title: "List of Cookies We Collect",
    //   content: [
    //     "Below is a list of cookies we collect and their descriptions:",
    //     [
    //       ["FORM_KEY", "Stores a random key to prevent forged requests."],
    //       ["PHPSESSID", "Your session ID on the server."],
    //       ["GUEST-VIEW", "Allows guests to view and edit their orders."],
    //       ["PERSISTENT_SHOPPING_CART", "Links to cart and viewing history."],
    //       ["STF", "Tracks products emailed to friends."],
    //       ["STORE", "Stores the selected language or store view."],
    //       ["USER_ALLOWED_SAVE_COOKIE", "Indicates if cookies are allowed."],
    //       ["MAGE-CACHE-SESSID", "Facilitates faster page loading via cache."],
    //       ["MAGE-CACHE-STORAGE", "Caches content on the browser."],
    //       ["SECTION-DATA-IDS", "Invalidates cached content when needed."],
    //       ["PRIVATE_CONTENT_VERSION", "Ensures updated private content."],
    //     ],
    //   ],
    // },
  ];

  return (
    <div className="bg-gray-100 p-6 pt-28">
      {sections.map((section, index) => (
        <div key={index} className="mb-4 rounded bg-white p-4 shadow-lg">
          <h2 className="mb-2 text-xl font-bold text-red-600">
            {section.title}
          </h2>
          <ul className="list-inside list-disc">
            {section.content.map((item, idx) =>
              Array.isArray(item) ? (
                <ul key={idx} className="ml-6 list-disc">
                  {item.map((subItem, subIdx) =>
                    Array.isArray(subItem) ? (
                      <li key={subIdx} className="mb-1">
                        <strong>{subItem[0]}:</strong> {subItem[1]}
                      </li>
                    ) : (
                      <li key={subIdx} className="mb-1">
                        {subItem}
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <li key={idx} className="mb-1 text-gray-700">
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
